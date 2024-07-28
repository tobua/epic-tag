import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export const rsbuild = defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: './index.tsx',
    },
  },
  html: {
    title: 'epic-tag Demo',
    favicon: '../logo.png',
  },
  output: {
    assetPrefix: '/epic-tag/',
  },
  tools: {
    rspack: {
      resolve: {
        alias: {
          'react/jsx-runtime': 'epic-jsx',
          'react/jsx-dev-runtime': 'epic-jsx',
        },
      },
    },
  },
})

export const gitignore = 'recommended'

export const typescript = {
  extends: 'web',
  files: ['index.tsx'],
}
