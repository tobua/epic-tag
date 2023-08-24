// @vitest-environment happy-dom

import React from 'react'
import { test, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { tag } from '../index'

test('Renders a tag with the proper styles.', async () => {
  const Paragraph = tag('p', 'flex center')
  const { getByText } = render(<Paragraph>my-paragraph</Paragraph>)

  const { style } = getByText('my-paragraph')

  expect(style.getPropertyValue('display')).toBe('flex')
  expect(style.getPropertyValue('justify-content')).toBe('center')
  expect(style.getPropertyValue('align-items')).toBe('center')
})

test('Warning if no tag specified.', async () => {
  const warnings = vi.spyOn(console, 'warn')

  expect(warnings.mock.calls.length).toBe(0)

  // @ts-ignore
  tag()

  expect(warnings.mock.calls.length).toBe(1)
  expect(warnings.mock.calls[0][0]).toContain('Missing variable Tag')

  vi.restoreAllMocks()
})

test('Styles are optional.', async () => {
  const Div = tag('div')

  expect(Div).toBeDefined()
})
