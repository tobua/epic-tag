import { extendStates, extendStyles, handleStateIn, log, validTag } from './helper'
import { toInline } from './style'
import type { HtmlTag, States, Style, Styles, TagProps, Tag as TagType } from './types'

export type { Styles, TagType as Tag }

export const refs: Record<string, HTMLElement> = {}

export const tag = <T extends HtmlTag, P extends string>(Tag: T | TagType<T, P>, styles?: Styles, states?: States<P>) => {
  if (!validTag(Tag)) {
    log('Missing variable Tag', 'warning') // No return for type inference.
  }

  // Merge inputs when existing component is extended.
  if (typeof Tag === 'function') {
    const { configuration } = Tag
    // biome-ignore lint/style/noParameterAssign: Seems easier
    Tag = configuration.tag
    // biome-ignore lint/style/noParameterAssign: Seems easier
    styles = extendStyles(configuration.styles, styles) as Styles
    // biome-ignore lint/style/noParameterAssign: Seems easier
    states = extendStates(configuration.states, states)
  }

  if (styles && !Array.isArray(styles)) {
    // biome-ignore lint/style/noParameterAssign: Seems easier
    styles = [styles]
  }

  function StyleTag(props: TagProps<T, P>) {
    const ref = { current: undefined } as unknown as { current: HTMLElement }
    const currentStyles = (styles ? (Array.isArray(styles) ? [...styles] : styles) : []) as Style[]
    // TODO useRef as value to keep track of styles.

    if (typeof states === 'object' && states.hover) {
      props.onMouseEnter = handleStateIn(ref, states.hover, props)
      props.onMouseLeave = () => {
        // Remove all styles and reset to initial styles (could be memoized).
        ref.current.removeAttribute('style')
        Object.assign(ref.current.style, toInline(currentStyles))
      }
    }

    if (typeof props === 'object' && typeof states === 'object' && states.focus) {
      props.onFocus = handleStateIn(ref, states.focus, props)
      props.onBlur = () => {
        // TODO other state styles should be kept.
        ref.current.removeAttribute('style')
        Object.assign(ref.current.style, toInline(currentStyles))
      }
    }

    if (typeof states === 'object') {
      for (const state of Object.keys(states)) {
        // @ts-ignore
        if (Array.isArray(currentStyles) && Object.hasOwn(props, state) && props[state]) {
          // @ts-ignore
          currentStyles.push(states[state])
        }
      }
    }

    if (props.focusable && typeof props.tabIndex === 'undefined') {
      // @ts-ignore
      props.tabIndex = '0'
    }

    // Resolve string styles.
    if (props.style && typeof props.style === 'string') {
      currentStyles.push(props.style)
      props.style = undefined
    }

    // @ts-ignore TODO
    this.after(() => {
      // @ts-ignore TODO
      ref.current = this.refs[0]

      if (props.id) {
        if (!Object.hasOwn(refs, props.id)) {
          refs[props.id] = ref.current
        } else if (process.env.NODE_ENV !== 'production') {
          log(`A ref with id ${props.id} has already been assigned, make sure to use unique ids.`, 'warning')
        }
      }
    })

    // @ts-ignore too complex for inference...
    return <Tag {...props} style={Object.assign(toInline(currentStyles) ?? {}, props.style)} />
  }

  // Pass inputs on for later extension of this component.
  StyleTag.configuration = { styles, states, tag: Tag }

  return StyleTag
}
