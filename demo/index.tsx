/// <reference types="@rsbuild/core/types" />
import { render } from 'epic-jsx'
import { tag } from 'epic-tag'
import logo from '../logo.svg'

const Wrapper = tag('div', 'font flex gap-10 column')
const MyButton = tag('button', 'color-blue p-sm button', { hover: { default: 'color-red', small: 'color-green' }, focus: 'color-green', small: 'fontSize-[10px]' })
const ExtendedButton = tag(MyButton, 'bg-yellow')
const MyInput = tag('input', 'bg-blue p-sm outline border', { hover: 'bg-red', focus: 'bg-green' })
const Image = tag('img', 'alignSelf-center width-[10vw] height-[10vw]')

render(
  <Wrapper>
    <Image focusable={true} src={logo} alt="epic-tag Logo" />
    <h1>epic-tag Demo</h1>
    <MyButton>Hover Me!</MyButton>
    <MyButton small>I'm smaller...</MyButton>
    <ExtendedButton>I'm extended?!</ExtendedButton>
    <MyInput value="123" />
  </Wrapper>,
)
