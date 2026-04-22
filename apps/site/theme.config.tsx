import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>react-tweet</span>,
  useNextSeoProps() {
    return {
      titleTemplate: '%s – react-tweet',
    }
  },
  project: {
    link: 'https://github.com/vercel/react-tweet',
  },
  docsRepositoryBase: 'https://github.com/vercel/react-tweet',
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  footer: {
    text: (
      
    ),
  },
}

export default config
