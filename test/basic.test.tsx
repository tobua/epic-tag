// @vitest-environment happy-dom

import { test, expect, vi } from 'vitest'
import { render } from 'epic-jsx/test'
// eslint-disable-next-line import/order
import * as React from 'epic-jsx'
import { tag } from '../index'

test('Renders a tag with the proper styles.', async () => {
  const Paragraph = tag('p', 'flex center')

  const { tree } = render(<Paragraph>my-paragraph</Paragraph>)

  expect(tree.tag).toBe('body')
  expect(tree.children[0].children[0].tag).toBe('p')

  const paragraph = tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(paragraph.style.cssText).toBe(
    'display: flex; justify-content: center; align-items: center;'
  )
})

test('Multiple tags can be rendered.', async () => {
  const Input = tag('input', 'radius padding')
  const Button = tag('button', 'font p-small')

  const { tree } = render(
    <>
      <Button>button</Button>
      <Input>text</Input>
    </>
  )

  expect(tree.tag).toBe('body')

  expect(tree.children[0].children[0].children[0].tag).toBe('button')

  const button = tree.children[0].children[0].children[0].getElement() as HTMLInputElement

  expect(button.style.cssText).toBe('font-family: sans; padding: 5px;')
})

test('Warning if no tag specified.', async () => {
  const warnings = vi.spyOn(console, 'warn')

  expect(warnings.mock.calls.length).toBe(0)

  // @ts-ignore
  tag()

  expect(warnings.mock.calls.length).toBe(1)
  expect(warnings.mock.calls[0][0]).toContain('Missing variable Tag')

  vi.restoreAllMocks()
})

test('Styles are optional.', async () => {
  const Div = tag('div')

  expect(Div).toBeDefined()
})
