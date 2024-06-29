import { test, expect } from 'bun:test'
import { mergeStyles, toInline } from '../style'

test('Styles are merged properly.', () => {
  expect(mergeStyles([{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual({ id: 3 })
  expect(
    mergeStyles([{ color: 'red', backgroundColor: 'blue' }, { color: 'green' }, { color: 'blue' }]),
  ).toEqual({ color: 'blue', backgroundColor: 'blue' })
})

test('Various style types are converted properly.', () => {
  expect(toInline('flex')).toEqual({ display: 'flex' })
  expect(toInline({ display: 'block' })).toEqual({ display: 'block' })
  expect(toInline(['flex', { flexDirection: 'column' }])).toEqual({
    display: 'flex',
    flexDirection: 'column',
  })
})
