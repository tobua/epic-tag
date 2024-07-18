import { render } from 'epic-jsx'
import { tag } from 'epic-tag'
import logo from '../logo.svg'

const Wrapper = tag('div', 'font flex gap-10 column')
const MyButton = tag('button', 'color-blue', { hover: 'color-red', focus: 'color-green' })
const MyInput = tag('input', 'bg-blue', { hover: 'bg-red', focus: 'bg-green' })
const Image = tag('img', 'alignSelf-center width-[10vw] height-[10vw]')

render(
  <Wrapper>
    <Image focusable={true} src={logo} alt="epic-tag Logo" />
    <h1>epic-tag Demo</h1>
    <MyButton>Hover Me!</MyButton>
    <MyInput value="123" />
  </Wrapper>,
)
