import { ei } from 'epic-inline'
import type { Styles } from './types'
export const mergeStyles = (styles: object[]) => styles.reduce((result, current) => Object.assign(result, current), {})

export const toInline = (styles?: Styles) => {
  if (!styles) {
    return undefined
  }
  if (Array.isArray(styles)) {
    // Type inference fail without intermediate variable ;(
    const result = mergeStyles(styles.map(toInline))
    return result
  }
  if (typeof styles === 'string') {
    return ei(styles)
  }
  return styles
}
