import type { FC, ReactNode } from 'react'

const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <html>
    <head />
    <body>{children}</body>
  </html>
)

export default RootLayout
