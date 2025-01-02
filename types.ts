import type { ComponentProps, JSX } from 'react'

export type HtmlTag = keyof JSX.IntrinsicElements
export type Style = string | CSSProperties
export type Styles = Style | Style[] | (CSSProperties | string)[]
export type States = {
  hover?: Styles
  focus?: Styles
  [key: string]: Styles | undefined
}
export type Tag =
  | HtmlTag
  | ((({ hover, ...props }: States & ComponentProps<any>) => JSX.Element) & {
      configuration: { styles?: Styles; states?: States; tag: HtmlTag }
    })

// biome-ignore lint/style/useNamingConvention: React default, same as epic-jsx.
export type CSSProperties = {
  [Key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[Key] extends string ? string | number : never
}
