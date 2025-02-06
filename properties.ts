import type React from 'epic-jsx'
import type { ColorName, Hex } from './types'

const PropertyKeys = {
  display: 'display',
  textDecoration: 'textDecoration',
  backgroundColor: 'backgroundColor',
  color: 'color',
  outline: 'outline',
  cursor: 'cursor',
  border: 'border',
  flexDirection: 'flexDirection',
  gap: 'gap',
  columnGap: 'columnGap',
  rowGap: 'rowGap',
  padding: 'padding',
  margin: 'margin',
  borderRadius: 'borderRadius',
} as const

export type PropertyKey = keyof typeof PropertyKeys

const Values = {
  none: 'none',
  flex: 'flex',
  block: 'block',
  inherit: 'inherit',
  pointer: 'pointer',
  row: 'row',
  column: 'column',
} as const

export type Value = keyof typeof Values

export const Sizes = {
  tiny: 5,
  small: 10,
  medium: 20,
  large: 40,
  huge: 80,
} as const

export type Size = keyof typeof Sizes

export const Colors = {
  red: 'red',
} as const

export type Color = keyof typeof Colors

export type Style = [PropertyKey, Value | Hex | ColorName | number | Size]

const hex = (color: Hex) => {
  return [PropertyKeys.color, color] as Style
}

const color = (colorName: ColorName) => {
  return [PropertyKeys.color, colorName] as Style
}

const size = (property: PropertyKey) => (size: Size | number) => {
  return [property, size] as Style
}

// First key will be used as the default value unless specified otherwise.
const Properties = {
  [PropertyKeys.display as 'display']: {
    [Values.flex as 'flex']: [PropertyKeys.display, Values.flex] as Style,
    [Values.block as 'block']: [PropertyKeys.display, Values.block] as Style,
  },
  [PropertyKeys.textDecoration as 'textDecoration']: {
    [Values.none as 'none']: [PropertyKeys.display, Values.flex] as Style,
  },
  [PropertyKeys.backgroundColor as 'backgroundColor']: {
    [Values.none as 'none']: [PropertyKeys.backgroundColor, Values.none] as Style,
    hex,
    color,
  },
  [PropertyKeys.color as 'color']: {
    [Values.inherit as 'inherit']: [PropertyKeys.color, Values.inherit] as Style,
    [Values.none as 'none']: [PropertyKeys.color, Values.none] as Style,
    hex,
    color,
  },
  [PropertyKeys.outline as 'outline']: {
    [Values.none as 'none']: [PropertyKeys.outline, Values.none] as Style,
  },
  [PropertyKeys.cursor as 'cursor']: {
    [Values.pointer as 'pointer']: [PropertyKeys.cursor, Values.pointer] as Style,
    [Values.none as 'none']: [PropertyKeys.cursor, Values.none] as Style,
  },
  [PropertyKeys.border as 'border']: {
    [Values.none as 'none']: [PropertyKeys.border, Values.none] as Style,
  },
  [PropertyKeys.flexDirection as 'flexDirection']: {
    [Values.column as 'column']: [PropertyKeys.flexDirection, Values.column] as Style,
    [Values.row as 'row']: [PropertyKeys.flexDirection, Values.row] as Style,
  },
  [PropertyKeys.gap as 'gap']: size(PropertyKeys.gap),
  [PropertyKeys.margin as 'margin']: size(PropertyKeys.margin),
  [PropertyKeys.padding as 'padding']: size(PropertyKeys.padding),
  [PropertyKeys.borderRadius as 'borderRadius']: size(PropertyKeys.borderRadius),
}

const ValueShortcuts = {
  flex: Properties.display.flex,
  f: Properties.display.flex,
  radius: Properties.borderRadius,
  r: Properties.borderRadius,
  p: Properties.padding,
} as const

const Shortcuts = {
  link: [Properties.textDecoration.none, Properties.color.inherit] as Style[],
  button: [Properties.outline.none, Properties.cursor.pointer, Properties.backgroundColor.none, Properties.border.none] as Style[],
  input: [Properties.outline.none, Properties.border.none] as Style[],
} as const

const Complex = {
  textShadow: () => null,
} as const

const Common = {
  flex: Properties.display.flex,
  col: Properties.flexDirection.column,
  row: Properties.flexDirection.row,
  gap: Properties.gap(Sizes.medium),
} as const

export const p = Properties
export const s = ValueShortcuts // Regular Shortcuts
export const c = Shortcuts // Component Shortcuts
export const t = Complex // Complex Combinations
export const m = Sizes // Size Values
export const a = Common // Commonly used Properties / Values

export function transform(styles: (Style | Style[])[]): React.CSSProperties {
  const objectStyles = {}

  for (const style of styles) {
    const [key, value] = style
    if (typeof key !== 'string') {
      Object.assign(objectStyles, transform(style as Style[]))
    } else {
      objectStyles[key] = value
    }
  }

  return objectStyles
}

// type CssGlobals = 'inherit' | 'initial' | 'revert' | 'unset'

// export type CssColor =
//   | 'currentColor'
//   | 'transparent'
//   | RGB
//   | RGBA
//   | HEX
//   | HSL
//   | HSLA
//   | VAR
//   | CssGlobals
