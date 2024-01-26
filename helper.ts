import { create } from 'logua'
import { Tag } from './types'

export const log = create('epic-tag', 'green')

export function validTag(tag: Tag) {
  if (!tag) return false
  const runtimeType = typeof tag
  if (runtimeType !== 'string' && runtimeType !== 'function') return false
  return true
}
