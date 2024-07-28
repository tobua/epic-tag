import './setup-dom'
import { expect, spyOn, test } from 'bun:test'
import { render } from 'epic-jsx/test'
import { tag } from '../index'

test('Renders a tag with the proper styles.', () => {
  const Paragraph = tag('p', 'flex center')

  const { tree } = render(<Paragraph>my-paragraph</Paragraph>)

  expect(tree.tag).toBe('body')
  expect(tree.children[0].children[0].tag).toBe('p')

  const paragraph = tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(paragraph.style.cssText).toBe('display: flex; justify-content: center; align-items: center;')
})

test('Pixel values are added for size styles.', () => {
  const Paragraph = tag('p', 'flex w-small p-12 flexGrow-1')
  const { tree } = render(<Paragraph>my-paragraph</Paragraph>)
  expect((tree.children[0].children[0].getElement() as HTMLParagraphElement).style.cssText).toBe(
    'display: flex; width: 5px; padding: 12px; flex-grow: 1;',
  )
})

test('Multiple tags can be rendered.', () => {
  const Input = tag('input', 'radius padding')
  const Button = tag('button', 'font p-small')

  const { tree } = render(
    <>
      <Button>button</Button>
      <Input>text</Input>
    </>,
  )

  expect(tree.tag).toBe('body')

  expect(tree.children[0].children[0].tag).toBe('button')

  const button = tree.children[0].children[0].getElement() as HTMLInputElement

  expect(button.style.cssText).toBe('font-family: sans-serif; padding: 5px;')
})

test('Warning if no tag specified.', () => {
  const warnings = spyOn(console, 'warn')

  expect(warnings.mock.calls.length).toBe(0)

  // @ts-ignore
  tag()

  expect(warnings.mock.calls.length).toBe(1)
  expect(warnings.mock.calls[0][0]).toContain('Missing variable Tag')

  warnings.mockRestore()
})

test('Styles are optional.', () => {
  const Div = tag('div')

  expect(Div).toBeDefined()
})

test('Existing tags can be extended.', () => {
  const Button = tag('button', 'flex color-blue')
  const RedButton = tag(Button, 'color-red')

  const { tree } = render(
    <>
      <Button>blue button</Button>
      <RedButton>red button</RedButton>
    </>,
  )

  expect(tree.tag).toBe('body')

  const firstButton = tree.children[0].children[0]
  const secondButton = tree.children[1].children[0]

  expect(firstButton.tag).toBe('button')
  expect(secondButton.tag).toBe('button')

  const blueButton = firstButton.getElement() as HTMLInputElement
  const redButton = secondButton.getElement() as HTMLInputElement

  expect(blueButton.style.cssText).toBe('display: flex; color: blue;')
  expect(redButton.style.cssText).toBe('display: flex; color: red;')
})

test('"focusable" property will add tabindex attribute.', () => {
  const Image = tag('img', 'width-[10vw] height-[10vw]')

  const { tree } = render(
    <>
      <Image>regular image</Image>
      <Image focusable={true}>focusable image</Image>
    </>,
  )

  const regularImage = tree.children[0].children[0].getElement() as HTMLInputElement
  const focusableImage = tree.children[1].children[0].getElement() as HTMLInputElement
  expect(regularImage.getAttribute('tabindex')).toBe(null)
  expect(focusableImage.getAttribute('tabindex')).toBe('0')
})
