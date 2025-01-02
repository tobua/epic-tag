import './setup-dom'
import { expect, spyOn, test } from 'bun:test'
import { render } from 'epic-jsx/test'
import { refs, tag } from '../index'

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

test('Various combinations are merged.', () => {
  const Link = tag('a', 'flex column link normal gap-medium')

  const { tree } = render(<Link>my-link</Link>)
  expect((tree.children[0].children[0].getElement() as HTMLParagraphElement).style.cssText).toBe(
    'display: flex; flex-direction: column; text-decoration: none; color: inherit; margin: 0px; gap: 10px;',
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

test('Can take an array of styles.', () => {
  const Paragraph = tag('p', ['flex bg-red', 'color-blue'])
  const { tree } = render(<Paragraph>merge</Paragraph>)
  expect((tree.children[0].children[0].getElement() as HTMLParagraphElement).style.cssText).toBe(
    'display: flex; background: red; color: blue;',
  )
})

test('Can take an array of styles with regular object styles.', () => {
  const Paragraph = tag('p', ['flex bg-red', { color: 'green' }, { transform: 'skewY(35deg)', boxShadow: '1px 2px' }])
  const { tree } = render(<Paragraph>merge</Paragraph>)
  expect((tree.children[0].children[0].getElement() as HTMLParagraphElement).style.cssText).toBe(
    'display: flex; background: red; color: green; transform: skewY(35deg); box-shadow: 1px 2px;',
  )
})

test('When an id is used as a prop on a tag the element ref will be accessible.', () => {
  const Button = tag('button', 'color-blue')
  const Div = tag('div', 'color-red')

  const { tree } = render(
    <>
      <Button id="button">button</Button>
      <Div id="div">div</Div>
    </>,
  )

  const button = tree.children[0].children[0].getElement() as HTMLInputElement
  const div = tree.children[1].children[0].getElement() as HTMLInputElement

  expect(refs.button.style.cssText).toEqual(button.style.cssText)
  expect(refs.div.style.cssText).toEqual(div.style.cssText)
})

test('style attribute will not override existing styles, but be merged.', () => {
  const Paragraph = tag('p', 'flex center')

  const { tree } = render(<Paragraph style={{ color: 'red', display: 'block' }}>my-paragraph</Paragraph>)

  expect(tree.tag).toBe('body')
  expect(tree.children[0].children[0].tag).toBe('p')

  const paragraph = tree.children[0].children[0].getElement() as HTMLParagraphElement

  expect(paragraph.style.cssText).toBe('display: block; justify-content: center; align-items: center; color: red;')
})
