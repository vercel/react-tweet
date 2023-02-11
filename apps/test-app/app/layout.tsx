import type { FC, ReactNode } from 'react'
import '../base.css'

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html>
    <head />
    <body>{children}</body>
  </html>
)

export default RootLayout
