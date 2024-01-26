import React, { ComponentProps } from 'react'
import { toInline } from './style'
import { Tag as TagType, Styles, States } from './types'
import { log, validTag } from './helper'

export const tag = (Tag: TagType, styles?: Styles, states?: States) => {
  if (!validTag(Tag)) log('Missing variable Tag', 'warning') // No return for type inference.

  return function StyleTag({ hover, ...props }: States & ComponentProps<any>) {
    let ref: HTMLElement

    if (typeof states === 'object' && states.hover) {
      props.onMouseEnter = () => {
        Object.assign(ref.style, toInline(states.hover))
      }

      props.onMouseLeave = () => {
        // Remove all styles and reset to initial styles (could be memoized).
        ref.removeAttribute('style')
        Object.assign(ref.style, toInline(styles))
      }
    }

    if (typeof states === 'object' && states.focus) {
      props.onFocus = () => {
        Object.assign(ref.style, toInline(states.focus))
      }

      props.onBlur = () => {
        // TODO other state styles should be kept.
        ref.removeAttribute('style')
        Object.assign(ref.style, toInline(styles))
      }
    }

    if (props.focusable && typeof props.tabIndex === 'undefined') {
      props.tabIndex = '0'
    }

    this.after(() => {
      ;[ref] = this.refs
    })

    return <Tag style={toInline(styles)} {...props} />
  }
}
