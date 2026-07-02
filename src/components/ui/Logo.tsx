'use client'

import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export function Logo({ size = 'md', href = '/' }: LogoProps) {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  }

  const content = (
    <span className={`font-black tracking-tight ${sizes[size]}`}>
      <span className="text-tiktok-red">Loop</span>
      <span className="text-white">Rush</span>
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
