import type { ComponentProps, JSX } from 'react'

export type HtmlTag = keyof JSX.IntrinsicElements
export type Styles = string | object | (string | object)[]
export type States = { hover?: Styles; focus?: Styles }
export type Tag =
  | HtmlTag
  | ((({ hover, ...props }: States & ComponentProps<any>) => JSX.Element) & {
      configuration: { styles?: Styles; states?: States; tag: HtmlTag }
    })
