import { expect, test } from 'bun:test'
import { s, t } from '../properties'

test('Properties are transformed.', () => {
  expect([t.flex, s.button]).toEqual([['display', 'flex'], 'button'])
})
