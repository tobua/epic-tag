import { expect, test } from 'bun:test'
import { a, c, m, p, s, transform } from '../properties'

test('Properties are transformed.', () => {
  expect([p.display.flex, p.display.block]).toEqual([
    ['display', 'flex'],
    ['display', 'block'],
  ])
  expect(transform([p.color.inherit, p.display.flex])).toEqual({ color: 'inherit', display: 'flex' })
  expect([p.color.inherit, p.color.hex('#EFEFEF'), p.color.color('red')]).toEqual([
    ['color', 'inherit'],
    ['color', '#EFEFEF'],
    ['color', 'red'],
  ])

  expect(transform([c.button, s.radius(m.tiny)])).toEqual({
    backgroundColor: 'none',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    outline: 'none',
  })

  expect(transform([a.flex, a.col, p.gap(m.medium), s.p(m.small)])).toEqual({
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 10,
  })
})
