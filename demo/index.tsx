import { render } from 'epic-jsx'
import { tag } from 'epic-tag'
import logo from './logo.svg'

const MyButton = tag('button', 'color-blue', { hover: 'color-red', focus: 'color-green' })
const MyInput = tag('input', 'bg-blue', { hover: 'bg-red', focus: 'bg-green' })

render(
  <div style={{ fontFamily: 'sans-serif', display: 'flex', gap: '10px', flexDirection: 'column' }}>
    <img
      src={logo}
      alt="epic-tag Logo"
      style={{ width: '10vw', height: '10vw', alignSelf: 'center' }}
    />
    <h1>epic-tag Demo</h1>
    <MyButton>Hover Me!</MyButton>
    <MyInput value="123" />
  </div>
)
