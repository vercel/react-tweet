/**
 * client component wrapper around react-parallax-tilt because it uses class components
 * that can't be used in React Server Components.
 */

'use client'

import TiltComponent, { type ReactParallaxTiltProps } from 'react-parallax-tilt'

export const Tilt = ({ children, ...props }: ReactParallaxTiltProps) => (
  <TiltComponent {...props}>{children}</TiltComponent>
)
