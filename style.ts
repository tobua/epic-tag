import { ei, configure } from 'epic-inline'
import { Styles } from './types'

configure({
  size: (value) => (typeof value === 'number' ? `${value}px` : value),
})

export const mergeStyles = (styles: object[]) =>
  styles.reduce((result, current) => ({ ...result, ...current }), {})

export const toInline = (styles?: Styles) => {
  if (!styles) return undefined
  if (Array.isArray(styles)) return mergeStyles(styles.map(toInline))
  if (typeof styles === 'string') return ei(styles)
  return styles
}
