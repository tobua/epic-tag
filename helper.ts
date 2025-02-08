import { create } from 'logua'
import type React from 'react'
import { toInline } from './style'
import type { HtmlTag, States, Style, Styles, Tag } from './types'

export const log = create('epic-tag', 'green')

export function validTag<T extends HtmlTag, P extends string>(tag: T | Tag<T, P>) {
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

export function extendStates<P extends string>(initial?: States<P>, additional?: States<P>) {
  if (!additional) {
    return initial
  }
  if (!initial) {
    return additional
  }

  const newStates = {} as States<P>
  const stateKeys = ['hover', 'focus', 'press'] as const

  for (const key of stateKeys) {
    if (initial[key] || additional[key]) {
      newStates[key] = extendStyles(initial[key], additional[key])
    }
  }

  return newStates
}

export function handleStateIn(ref: { current: HTMLElement }, state: Styles | { [key: string]: Styles }, props: React.ComponentProps<any>) {
  let specificState = state as Styles
  if (typeof state === 'object') {
    let found = false
    for (const key of Object.keys(state)) {
      if (key in props) {
        // @ts-ignore
        specificState = state[key]
        found = true
        break // Use the first matching prop value for state
      }
    }
    // @ts-ignore
    if (!found && state.default) {
      // @ts-ignore
      specificState = state.default
    }
  }

  return () => {
    if (!ref.current) {
      return toInline(specificState)
    }

    Object.assign(ref.current.style, toInline(specificState))
  }
}

export function handleStateOut(ref: { current: HTMLElement }, currentStyles: Style[]) {
  return () => {
    if (!ref.current) {
      return toInline()
    }

    // TODO styles from other state styles should be kept.
    // Remove all styles and reset to initial styles (could be memoized).
    ref.current.removeAttribute('style')
    Object.assign(ref.current.style, toInline(currentStyles))
  }
}
