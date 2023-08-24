import React from 'react'
import { toInline } from './style'
import { HTMLTag, Styles } from './types'
import { log } from './helper'

export const tag = (Tag: HTMLTag, styles?: Styles) => {
  if (!Tag || typeof Tag !== 'string') log('Missing variable Tag', 'warning') // No return for type inference.

  return function StyleTag({ ...props }) {
    return <Tag style={toInline(styles)} {...props} />
  }
}
