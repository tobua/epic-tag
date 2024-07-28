import { ei } from 'epic-inline'
import type { CSSProperties, Styles } from './types'

export const mergeStyles = (styles: object[]) => styles.reduce((result, current) => Object.assign(result, current), {})

// TODO manually maintained, same as epic-jsx.
const sizeStyleProperties = [
  'width',
  'height',
  'border',
  'margin',
  'padding',
  'top',
  'right',
  'bottom',
  'left',
  'gap',
  'rowGap',
  'columnGap',
]

function startsWithSizeProperty(propertyName: string) {
  return sizeStyleProperties.some((prop) => propertyName.startsWith(prop))
}

function convertStylesToPixels(styleObject: CSSStyleDeclaration) {
  const convertedStyles: CSSProperties = {}
  for (const key in styleObject) {
    if (Object.hasOwn(styleObject, key)) {
      const value = styleObject[key]
      if (typeof value === 'number' && startsWithSizeProperty(key)) {
        convertedStyles[key] = `${value}px`
      } else {
        convertedStyles[key] = value
      }
    }
  }
  return convertedStyles
}

export const toInline = (styles?: Styles) => {
  if (!styles) {
    return undefined
  }
  if (typeof styles === 'string') {
    const convertedStyles = ei(styles)
    return typeof convertedStyles === 'object' ? convertStylesToPixels(convertedStyles as any) : convertedStyles
  }
  if (Array.isArray(styles)) {
    // This will convert all string based styles if possible, later filters out non-objects for safety.
    const mappedStyles = styles.map(toInline) as object[]
    // Type inference fail without intermediate variable ;(
    const objectStyles = mappedStyles.filter((style) => typeof style === 'object' && style !== null)
    return mergeStyles(objectStyles)
  }
  return styles
}
