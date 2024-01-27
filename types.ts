import type { ComponentProps } from 'react'

export type HTMLTag = keyof JSX.IntrinsicElements
export type Styles = string | object | (string | object)[]
export type States = { hover?: Styles; focus?: Styles }
export type Tag =
  | HTMLTag
  | ((({ hover, ...props }: States & ComponentProps<any>) => React.JSX.Element) & {
      configuration: { styles?: Styles; states?: States; tag: HTMLTag }
    })
