import type { Component } from 'epic-jsx'
import { extendStates, extendStyles, handleStateIn, handleStateOut, log, validTag } from './helper'
import { toInline } from './style'
import type { HtmlTag, States, Style, Styles, TagProps, Tag as TagType } from './types'

export type { Styles, TagType as Tag }

export const refs: Record<string, HTMLElement> = {}

export const tag = <T extends HtmlTag, P extends string>(Tag: T | TagType<T, P>, styles?: Styles, states?: States<P>): TagType<T, P> => {
  if (!validTag(Tag)) {
    log('Missing variable Tag', 'warning') // No return for type inference.
  }

  // Merge inputs when existing component is extended.
  if (typeof Tag === 'function') {
    const { configuration } = Tag
    Tag = configuration.tag
    styles = extendStyles(configuration.styles, styles) as Styles
    states = extendStates(configuration.states, states)
  }

  if (styles && !Array.isArray(styles)) {
    styles = [styles]
  }

  const TagComponent = Tag as TagType<T, P>

  function StyleTag(this: Component, props: TagProps<T, P>) {
    const ref = { current: undefined } as unknown as { current: HTMLElement }
    const currentStyles = (styles ? (Array.isArray(styles) ? [...styles] : styles) : []) as Style[]
    // TODO useRef as value to keep track of styles.

    if (typeof states === 'object' && states.hover) {
      props.onMouseEnter = handleStateIn(ref, states.hover, props)
      props.onMouseLeave = handleStateOut(ref, currentStyles)
    }

    if (typeof states === 'object' && states.focus) {
      // TODO also consider, onFocusIn, onFocus out folder children coming in and out of focus.
      props.onFocus = handleStateIn(ref, states.focus, props)
      props.onBlur = handleStateOut(ref, currentStyles)
    }

    if (typeof states === 'object' && states.press) {
      props.onMouseDown = handleStateIn(ref, states.press, props)
      props.onMouseUp = handleStateOut(ref, currentStyles)
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

    this.once(() => {
      ref.current = this.refs[0] as HTMLElement

      if (props.id) {
        if (!Object.hasOwn(refs, props.id)) {
          refs[props.id] = ref.current
        } else if (process.env.NODE_ENV !== 'production') {
          log(`A ref with id ${props.id} has already been assigned, make sure to use unique ids.`, 'warning')
        }
      }
    })

    const objectStyles = Object.assign(toInline(currentStyles) ?? {}, props.style)

    return <TagComponent {...props} style={objectStyles} />
  }

  // Pass inputs on for later extension of this component.
  StyleTag.configuration = { styles, states, tag: Tag as TagType<T, P> }

  return StyleTag
}
