import { expect, test } from 'bun:test'
import { mergeStyles, toInline } from '../style'

test('Styles are merged properly.', () => {
  expect(mergeStyles([{ color: 'red' }, { color: 'blue' }, { color: 'green' }])).toEqual({ color: 'green' })
  expect(mergeStyles([{ color: 'red', backgroundColor: 'blue' }, { color: 'green' }, { color: 'blue' }])).toEqual({
    color: 'blue',
    backgroundColor: 'blue',
  })
})

test('Various style types are converted properly.', () => {
  expect(toInline('flex')).toEqual({ display: 'flex' })
  expect(toInline({ display: 'block' })).toEqual({ display: 'block' })
  expect(toInline(['flex', { flexDirection: 'column' }])).toEqual({
    display: 'flex',
    flexDirection: 'column',
  })
  expect(toInline(['flex', 'missing', { flexDirection: 'column' }, 'ignored'])).toEqual({
    display: 'flex',
    flexDirection: 'column',
  })
})
