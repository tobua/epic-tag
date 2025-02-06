import type React from 'epic-jsx'

export type HtmlTag = keyof React.JSX.IntrinsicElements
export type Style = string | React.CSSProperties
export type Styles = Style | Style[] // TODO does this have an effect???? | (CSSProperties | string)[]
export type States<T extends string> = {
  hover?: Styles | { [key: string]: Styles }
  focus?: Styles | { [key: string]: Styles }
} & { [K in T]: Styles | { [key: string]: Styles } | undefined }

export type Props<T extends string> = { focusable?: boolean } & { [K in T]?: unknown extends boolean ? never : unknown }
export type TagProps<T extends HtmlTag, S extends string> = Props<S> & React.ComponentProps<T> & { style?: Style }
export type Tag<T extends HtmlTag, S extends string> = ((props: TagProps<T, S>) => React.JSX.Element) & {
  configuration: { tag: Tag<T, S>; styles?: Styles; states?: States<S> }
}

// from color-types (npm) which cannot be installed without adding the d.ts to declarations.
declare type ColorNameTitleCase =
  | 'AliceBlue'
  | 'AntiqueWhite'
  | 'Aqua'
  | 'Aquamarine'
  | 'Azure'
  | 'Beige'
  | 'Bisque'
  | 'Black'
  | 'BlanchedAlmond'
  | 'Blue'
  | 'BlueViolet'
  | 'Brown'
  | 'BurlyWood'
  | 'CadetBlue'
  | 'Chartreuse'
  | 'Chocolate'
  | 'Coral'
  | 'CornflowerBlue'
  | 'Cornsilk'
  | 'Crimson'
  | 'Cyan'
  | 'DarkBlue'
  | 'DarkCyan'
  | 'DarkGoldenRod'
  | 'DarkGray'
  | 'DarkGrey'
  | 'DarkGreen'
  | 'DarkKhaki'
  | 'DarkMagenta'
  | 'DarkOliveGreen'
  | 'DarkOrange'
  | 'DarkOrchid'
  | 'DarkRed'
  | 'DarkSalmon'
  | 'DarkSeaGreen'
  | 'DarkSlateBlue'
  | 'DarkSlateGray'
  | 'DarkSlateGrey'
  | 'DarkTurquoise'
  | 'DarkViolet'
  | 'DeepPink'
  | 'DeepSkyBlue'
  | 'DimGray'
  | 'DimGrey'
  | 'DodgerBlue'
  | 'FireBrick'
  | 'FloralWhite'
  | 'ForestGreen'
  | 'Fuchsia'
  | 'Gainsboro'
  | 'GhostWhite'
  | 'Gold'
  | 'GoldenRod'
  | 'Gray'
  | 'Grey'
  | 'Green'
  | 'GreenYellow'
  | 'HoneyDew'
  | 'HotPink'
  | 'IndianRed'
  | 'Indigo'
  | 'Ivory'
  | 'Khaki'
  | 'Lavender'
  | 'LavenderBlush'
  | 'LawnGreen'
  | 'LemonChiffon'
  | 'LightBlue'
  | 'LightCoral'
  | 'LightCyan'
  | 'LightGoldenRodYellow'
  | 'LightGray'
  | 'LightGrey'
  | 'LightGreen'
  | 'LightPink'
  | 'LightSalmon'
  | 'LightSeaGreen'
  | 'LightSkyBlue'
  | 'LightSlateGray'
  | 'LightSlateGrey'
  | 'LightSteelBlue'
  | 'LightYellow'
  | 'Lime'
  | 'LimeGreen'
  | 'Linen'
  | 'Magenta'
  | 'Maroon'
  | 'MediumAquaMarine'
  | 'MediumBlue'
  | 'MediumOrchid'
  | 'MediumPurple'
  | 'MediumSeaGreen'
  | 'MediumSlateBlue'
  | 'MediumSpringGreen'
  | 'MediumTurquoise'
  | 'MediumVioletRed'
  | 'MidnightBlue'
  | 'MintCream'
  | 'MistyRose'
  | 'Moccasin'
  | 'NavajoWhite'
  | 'Navy'
  | 'OldLace'
  | 'Olive'
  | 'OliveDrab'
  | 'Orange'
  | 'OrangeRed'
  | 'Orchid'
  | 'PaleGoldenRod'
  | 'PaleGreen'
  | 'PaleTurquoise'
  | 'PaleVioletRed'
  | 'PapayaWhip'
  | 'PeachPuff'
  | 'Peru'
  | 'Pink'
  | 'Plum'
  | 'PowderBlue'
  | 'Purple'
  | 'RebeccaPurple'
  | 'Red'
  | 'RosyBrown'
  | 'RoyalBlue'
  | 'SaddleBrown'
  | 'Salmon'
  | 'SandyBrown'
  | 'SeaGreen'
  | 'SeaShell'
  | 'Sienna'
  | 'Silver'
  | 'SkyBlue'
  | 'SlateBlue'
  | 'SlateGray'
  | 'SlateGrey'
  | 'Snow'
  | 'SpringGreen'
  | 'SteelBlue'
  | 'Tan'
  | 'Teal'
  | 'Thistle'
  | 'Tomato'
  | 'Turquoise'
  | 'Violet'
  | 'Wheat'
  | 'White'
  | 'WhiteSmoke'
  | 'Yellow'
  | 'YellowGreen'
declare type ColorNameLowerCase = Lowercase<ColorNameTitleCase>
declare type ColorNameUpperCase = Uppercase<ColorNameTitleCase>
export declare type ColorName = ColorNameLowerCase | ColorNameTitleCase | ColorNameUpperCase

declare type Rgb = `rgb(${number}, ${number}, ${number})` | `rgb(${number} ${number} ${number})`
declare type Rgba =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number} ${number} ${number} / ${number}%)`
  | `rgb(${number} ${number} ${number} / ${number}%)`
  | `rgb(${number} ${number} ${number} / ${number})`
export declare type Hex = `#${string}`
declare type Hsl =
  | `hsl(${number} ${number}% ${number}%)`
  | `hsl(${number}deg ${number}% ${number}%)`
  | `hsl(${number}rad ${number}% ${number}%)`
  | `hsl(${number}turn ${number}% ${number}%)`
  | `hsl(${number}, ${number}%, ${number}%)`
  | `hsl(${number}deg, ${number}%, ${number}%)`
  | `hsl(${number}rad, ${number}%, ${number}%)`
  | `hsl(${number}turn, ${number}%, ${number}%)`
declare type Hsla =
  | `hsla(${number}, ${number}%, ${number}%, ${number})`
  | `hsla(${number}deg, ${number}%, ${number}%, ${number})`
  | `hsla(${number}rad, ${number}%, ${number}%, ${number})`
  | `hsla(${number}turn, ${number}%, ${number}%, ${number})`
  | `hsla(${number} ${number}% ${number}% / ${number}%)`
  | `hsla(${number}deg ${number}% ${number}% / ${number}%)`
  | `hsla(${number}rad ${number}% ${number}% / ${number}%)`
  | `hsla(${number}turn ${number}% ${number}% / ${number}%)`
declare type Hwb =
  | `hwb(${number} ${number}% ${number}%)`
  | `hwb(${number}deg ${number}% ${number}%)`
  | `hwb(${number}rad ${number}% ${number}%)`
  | `hwb(${number}turn ${number}% ${number}%)`
  | `hwb(${number} ${number}% ${number}% / ${number}%)`
  | `hwb(${number}deg ${number}% ${number}% / ${number}%)`
  | `hwb(${number}rad ${number}% ${number}% / ${number}%)`
  | `hwb(${number}turn ${number}% ${number}% / ${number}%)`
  | `hwb(${number} ${number}% ${number}% / ${number})`
  | `hwb(${number}deg ${number}% ${number}% / ${number})`
  | `hwb(${number}rad ${number}% ${number}% / ${number})`
  | `hwb(${number}turn ${number}% ${number}% / ${number})`

export declare type Color = Rgb | Rgba | Hex | Hsl | Hsla | Hwb | ColorName
