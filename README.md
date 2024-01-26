# epic-tag

<img align="right" src="https://github.com/tobua/epic-tag/raw/main/logo.svg" width="30%" alt="Style Logo" />

Advanced styled components for React.

- 💅 Styled components
- 🏠 Native updates without rerender
- 🤌 State (hover, focus...) specific styles
- 💨 String based property shortcuts

## Usage

Use the `tag` method to apply styles to any tag resulting in reusable and extendable styled components.

```tsx
import { render } from 'epic-jsx'
import { tag } from 'epic-tag'

const MyButton = tag('button', 'color-blue', { hover: 'color-red', focus: 'color-green' })

render(<MyButton>Hover Me!</MyButton>)
```
