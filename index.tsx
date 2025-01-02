import type { ComponentProps } from 'react'
import { extendStates, extendStyles, log, validTag } from './helper'
import { toInline } from './style'
import type { States, Styles, Tag as TagType } from './types'

export const refs: Record<string, HTMLElement> = {}

export const tag = (Tag: TagType, styles?: Styles, states?: States) => {
  if (!validTag(Tag)) {
    log('Missing variable Tag', 'warning') // No return for type inference.
  }

  // Merge inputs when existing component is extended.
  if (typeof Tag === 'function') {
    const { configuration } = Tag
    // biome-ignore lint/style/noParameterAssign: Seems easier
    Tag = configuration.tag
    // biome-ignore lint/style/noParameterAssign: Seems easier
    styles = extendStyles(configuration.styles, styles)
    // biome-ignore lint/style/noParameterAssign: Seems easier
    states = extendStates(configuration.states, states)
  }

  if (styles && !Array.isArray(styles)) {
    // biome-ignore lint/style/noParameterAssign: Seems easier
    styles = [styles]
  }

  function StyleTag({ hover, ...props }: States & ComponentProps<any>) {
    let ref: HTMLElement
    const currentStyles: Styles = styles ? (Array.isArray(styles) ? [...styles] : styles) : []
    // TODO useRef as value to keep track of styles.

    if (typeof states === 'object' && states.hover) {
      props.onMouseEnter = () => {
        Object.assign(ref.style, toInline(states.hover))
      }

      props.onMouseLeave = () => {
        // Remove all styles and reset to initial styles (could be memoized).
        ref.removeAttribute('style')
        Object.assign(ref.style, toInline(currentStyles))
      }
    }

    if (typeof states === 'object' && states.focus) {
      props.onFocus = () => {
        Object.assign(ref.style, toInline(states.focus))
      }

      props.onBlur = () => {
        // TODO other state styles should be kept.
        ref.removeAttribute('style')
        Object.assign(ref.style, toInline(currentStyles))
      }
    }

    if (typeof states === 'object') {
      for (const state of Object.keys(states)) {
        if (Array.isArray(currentStyles) && Object.hasOwn(props, state) && props[state]) {
          // @ts-ignore
          currentStyles.push(states[state])
        }
      }
    }

    if (props.focusable && typeof props.tabIndex === 'undefined') {
      props.tabIndex = '0'
    }

    // @ts-ignore TODO
    this.after(() => {
      // @ts-ignore TODO
      ;[ref] = this.refs

      if (props.id) {
        if (!Object.hasOwn(refs, props.id)) {
          refs[props.id] = ref
        } else if (process.env.NODE_ENV !== 'production') {
          log(`A ref with id ${props.id} has already been assigned, make sure to use unique ids.`, 'warning')
        }
      }
    })

    return <Tag {...props} style={Object.assign(toInline(currentStyles) ?? {}, props.style)} />
  }

  // Pass inputs on for later extension of this component.
  StyleTag.configuration = { styles, states, tag: Tag }

  return StyleTag
}
