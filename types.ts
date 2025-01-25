import type React from 'react'

export type HtmlTag = keyof React.JSX.IntrinsicElements
export type Style = string | CSSProperties
export type Styles = Style | Style[] | (CSSProperties | string)[]
export type States = {
  hover?: Styles | { [key: string]: Styles }
  focus?: Styles | { [key: string]: Styles }
  // Due to TS structural typing hover and focus is also required here...
  [key: string]: Styles | { [key: string]: Styles } | undefined
}
export type Tag =
  | HtmlTag
  | ((({ hover, ...props }: States & React.ComponentProps<any>) => React.JSX.Element) & {
      configuration: { styles?: Styles; states?: States; tag: HtmlTag }
    })

// biome-ignore lint/style/useNamingConvention: React default, same as epic-jsx.
export type CSSProperties = {
  [Key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[Key] extends string ? string | number : never
}
