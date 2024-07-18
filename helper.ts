import { create } from 'logua'
import type { States, Styles, Tag } from './types'

export const log = create('epic-tag', 'green')

export function validTag(tag: Tag) {
  if (!tag) {
    return false
  }
  const runtimeType = typeof tag
  if (runtimeType !== 'string' && runtimeType !== 'function') {
    return false
  }
  return true
}

// TODO also handle object values.
export function extendStyles(initial?: Styles, additional?: Styles) {
  if (!additional) {
    return initial
  }
  if (!initial) {
    return additional
  }
  return `${initial} ${additional}`
}

export function extendStates(initial?: States, additional?: States) {
  if (!additional) {
    return initial
  }
  if (!initial) {
    return additional
  }

  const newStates: States = {}

  if (initial.hover || additional.hover) {
    newStates.hover = extendStyles(initial.hover, additional.hover)
  }

  if (initial.focus || additional.focus) {
    newStates.focus = extendStyles(initial.focus, additional.focus)
  }

  return newStates
}
