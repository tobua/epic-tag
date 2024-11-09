import type { ComponentProps, JSX } from 'react'

export type HtmlTag = keyof JSX.IntrinsicElements
export type Style = string | CSSProperties
export type Styles = Style | Style[] | (Properties | number | string)[]
export type States = { hover?: Styles; focus?: Styles }
export type Tag =
  | HtmlTag
  | ((({ hover, ...props }: States & ComponentProps<any>) => JSX.Element) & {
      configuration: { styles?: Styles; states?: States; tag: HtmlTag }
    })

// biome-ignore lint/style/useNamingConvention: React default, same as epic-jsx.
export type CSSProperties = { [key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[key] extends string ? string | number : never }
