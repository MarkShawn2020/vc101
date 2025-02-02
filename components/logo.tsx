'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import { SVGProps } from 'react'
import LogoSvg from '@/public/cs-magic_logo_1280.svg'

interface LogoProps {
  mode?: 'svg' | 'image'
  className?: string
  color?: string
  size?: number
}

export default function Logo({ mode = 'svg', className = '', color, size = 32 }: LogoProps) {
  const { theme } = useTheme()

  if (mode === 'svg') {
    // SVG mode - can change color dynamically
    return (
      <LogoSvg
        className={className}
        width={size}
        height={size}
        fill={color || 'currentColor'}
      />
    )
  }

  // Image mode - theme-based image
  return (
    <Image
      src={theme === 'dark' ? '/cs-magic_logo_dark.png' : '/cs-magic_logo_light.png'}
      alt="CS Magic Logo"
      width={size}
      height={size}
      className={className}
    />
  )
}
