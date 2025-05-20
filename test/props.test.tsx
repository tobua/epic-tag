import './setup-dom'
import { expect, test } from 'bun:test'
import { render } from 'epic-jsx/test'
import { tag } from '../index'

test('Array based values are merged properly.', () => {
  const Button = tag('button', ['color-blue', 'flex', 'display-block', 'color-red'])

  const { tree } = render(<Button>my-button</Button>)

  const button = tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: red; display: block;')
})

test('Props are applied as styles when truthy.', () => {
  const Button = tag('button', 'color-blue', { selected: 'color-green' })

  // True
  let root = render(<Button selected={true}>my-button</Button>)
  let button = root.tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: green;')

  // Truthy
  root = render(<Button selected={1}>my-button</Button>)
  button = root.tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: green;')

  // False
  root = render(<Button selected={false}>my-button</Button>)
  button = root.tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: blue;')

  // Missing
  root = render(<Button>my-button</Button>)
  button = root.tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: blue;')
})

test('String styles can be passed as props.', () => {
  const Button = tag('button', 'color-blue')

  let root = render(<Button style="flex">my-button</Button>)
  let button = root.tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: blue; display: flex;')

  root = render(<Button style="flex color-red">my-button</Button>)
  button = root.tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: red; display: flex;')

  root = render(<Button style={{ display: 'flex', color: 'red' }}>my-button</Button>)
  button = root.tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: red; display: flex;')
})

test("Props defined on the tag aren't passed through.", () => {
  const Button = tag('button', 'color-blue', { missing: 'color-green', disabled: 'bg-red', active: 'bold' })

  const root = render(
    <Button missing={true} disabled={true} active={true} title="Labelled">
      my-button
    </Button>,
  )
  const button = root.tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(button.tagName.toLowerCase()).toBe('button')
  expect(button.style.cssText).toBe('color: green; background: red; font-weight: bold;')
  expect(button.hasAttribute('missing')).toBe(false)
  expect(button.hasAttribute('disabled')).toBe(true) // Common props are passed through.
  expect(button.hasAttribute('active')).toBe(false)
  expect(button.hasAttribute('title')).toBe(true)
})
