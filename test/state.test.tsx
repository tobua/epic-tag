import './setup-dom'
import { expect, test } from 'bun:test'
import { render } from 'epic-jsx/test'
import { tag } from '../index'

const triggerMouseEvent = (type: 'enter' | 'leave', element: HTMLElement) => {
  const event = new MouseEvent(`mouse${type}`, {
    bubbles: true,
    cancelable: true,
    view: window,
  })

  element.dispatchEvent(event)
}

test('Hover state styles are applied on hover.', () => {
  const Button = tag('button', 'color-blue', { hover: 'color-red' })

  const { tree } = render(<Button>my-button</Button>)

  const button = tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')

  expect(button.style.cssText).toBe('color: blue;')

  triggerMouseEvent('enter', button)

  expect(button.style.cssText).toBe('color: red;')

  triggerMouseEvent('leave', button)

  expect(button.style.cssText).toBe('color: blue;')
})

test('Focus state styles are applied on focus on removed on blur.', () => {
  const Button = tag('button', 'color-blue', { hover: 'color-red', focus: 'color-green' })

  const { tree } = render(<Button>my-button</Button>)

  const button = tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')

  expect(button.style.cssText).toBe('color: blue;')

  button.focus()

  expect(button.style.cssText).toBe('color: green;')

  button.blur()

  expect(button.style.cssText).toBe('color: blue;')
})

test('Any element can be made focusable.', () => {
  const Div = tag('div', 'color-blue', { focus: 'color-green' })

  const { tree } = render(<Div focusable={true}>my-div</Div>)

  const div = tree.children[0].children[0].getElement() as HTMLDivElement

  expect(div.tagName.toLowerCase()).toBe('div')
  expect(div.style.cssText).toBe('color: blue;')
  expect(div.getAttribute('tabIndex')).toBe('0')

  div.focus()

  expect(div.style.cssText).toBe('color: green;')
})
