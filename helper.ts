import { create } from 'logua'
import type React from 'react'
import { toInline } from './style'
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

export function extendStyles(initial?: Styles | { [key: string]: Styles }, additional?: Styles | { [key: string]: Styles }) {
  if (!additional) {
    return initial
  }
  if (!initial) {
    return additional
  }
  // Styles also use this an can be arrays.
  if (typeof initial === 'object' && !Array.isArray(initial)) {
    if (typeof additional === 'object') {
      return Object.assign(initial, additional)
    }
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

export function handleStateIn(ref: { current: HTMLElement }, state: Styles | { [key: string]: Styles }, props: React.ComponentProps<any>) {
  let hover = state as Styles
  if (typeof state === 'object') {
    let found = false
    for (const key of Object.keys(state)) {
      if (key in props) {
        // @ts-ignore
        hover = state[key]
        found = true
        break // Use the first matching prop value for hover
      }
    }
    // @ts-ignore
    if (!found && state.default) {
      // @ts-ignore
      hover = state.default
    }
  }

  return () => {
    Object.assign(ref.current.style, toInline(hover))
  }
}
