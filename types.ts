import type React from 'react'

export type HtmlTag = keyof React.JSX.IntrinsicElements
export type Style = string | CSSProperties
export type Styles = Style | Style[] // TODO does this have an effect???? | (CSSProperties | string)[]
export type States<T extends string> = {
  hover?: Styles | { [key: string]: Styles }
  focus?: Styles | { [key: string]: Styles }
} & { [K in T]: Styles | { [key: string]: Styles } | undefined }

export type Props<T extends string> = { focusable?: boolean } & { [K in T]?: unknown extends boolean ? never : unknown }
export type TagProps<T extends HtmlTag, S extends string> = Props<S> & React.ComponentProps<T> & { style?: Style }
export type Tag<T extends HtmlTag, S extends string> = ((props: TagProps<T, S>) => React.JSX.Element) & {
  configuration: { tag: T | Tag<T, S>; styles?: Styles; states?: States<S> }
}

// biome-ignore lint/style/useNamingConvention: React default, same as epic-jsx.
export type CSSProperties = {
  [Key in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[Key] extends string ? string | number : never
}
