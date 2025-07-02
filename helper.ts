import type React from 'epic-jsx'
import { create } from 'logua'
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

export function handleStateIn(
  ref: { tag: { native: HTMLElement } },
  state: Styles | { [key: string]: Styles },
  props: React.ComponentProps<any>,
) {
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

  return (event: any) => {
    event.preventDefault() // Ensures that focus will not override press when "pressed".
    if (!ref.tag.native) {
      return toInline(specificState)
    }

    Object.assign(ref.tag.native.style, toInline(specificState))
  }
}

function kebabToCamel(str: string): string {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}

function cssStyleToObject(style: CSSStyleDeclaration): Record<string, string> {
  const obj: Record<string, string> = {}
  for (let i = 0; i < style.length; i++) {
    const key = style.item(i)
    if (key) {
      const camelKey = kebabToCamel(key)
      obj[camelKey] = style.getPropertyValue(key)
    }
  }
  return obj
}

export function handleStateOut(ref: { tag: { native: HTMLElement } }, currentStyles: Style[]) {
  return () => {
    if (!ref.tag.native) {
      return toInline()
    }

    // Get current inline styles as an object
    // TODO will preserve too many styles, keep state of plugin styles and remove those.
    const existingStyles = cssStyleToObject(ref.tag.native.style)
    const pluginStyles = (toInline(currentStyles) ?? {}) as Record<string, string>

    // Merge, giving priority to pluginStyles
    const mergedStyles = { ...existingStyles, ...pluginStyles }

    // Remove all styles and reset to merged styles
    ref.tag.native.removeAttribute('style')
    Object.assign(ref.tag.native.style, mergedStyles)
  }
}

// Use possibleStandardNames from epic-jsx?
// This list only includes attribues currently that sound like they could be used as states.
const htmlAttributes = new Set([
  'disabled',
  'checked',
  'selected',
  'readonly',
  'required',
  'hidden',
  'open',
  'autofocus',
  'autoplay',
  'loop',
  'muted',
  'controls',
  'download',
  'draggable',
])

export function removeStateProperties(props: Record<string, unknown>, states: Record<string, unknown>) {
  for (const key in props) {
    if (key in states && !htmlAttributes.has(key)) {
      delete props[key]
    }
  }
  return props
}
