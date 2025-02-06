import './setup-dom'
import { afterEach, expect, test } from 'bun:test'
import type React from 'epic-jsx'
import { type Component, unmountAll } from 'epic-jsx'
import { render, run, serializeElement } from 'epic-jsx/test'
import { tag } from '../index'

afterEach(unmountAll)

test("Rerenders don't cause any JSX rendering related issues.", () => {
  const context: { app?: Component; layout?: Component } = {}
  let stage = 0

  const Paragraph = tag('p', 'flex')
  const Button = tag('button', 'flex')
  const Wrapper = tag('div')

  const Page = tag('div')
  const Content = tag('main')
  const Header = tag('header')
  const Footer = tag('footer')

  function Layout({ children }: { children: React.ReactNode }) {
    context.layout = this
    return (
      <Page>
        <Header>head</Header>
        <Content>{children}</Content>
        <Footer>foot</Footer>
      </Page>
    )
  }

  function App() {
    context.app = this

    if (stage === 2) {
      return (
        <Layout>
          <Paragraph>Some text</Paragraph>
          <Button>Click {stage}</Button>
        </Layout>
      )
    }

    return (
      <Layout>
        <Wrapper>
          <Button>Click {stage}</Button>
          <Paragraph>Some text</Paragraph>
        </Wrapper>
      </Layout>
    )
  }

  const { serialized } = render(<App />)

  expect(serialized).toEqual(
    '<body><div><header>head</header><main><div><button style="display: flex;">Click 0</button><p style="display: flex;">Some text</p></div></main><footer>foot</footer></div></body>',
  )

  stage = 1
  context.app.rerender()
  run()

  expect(serializeElement()).toEqual(
    '<body><div><header>head</header><main><div><button style="display: flex;">Click 1</button><p style="display: flex;">Some text</p></div></main><footer>foot</footer></div></body>',
  )

  stage = 2
  context.layout.rerender()
  context.app.rerender()
  context.layout.rerender()
  run()

  expect(serializeElement()).toEqual(
    '<body><div><header>head</header><main><p style="display: flex;">Some text</p><button style="display: flex;">Click 2</button></main><footer>foot</footer></div></body>',
  )
})
