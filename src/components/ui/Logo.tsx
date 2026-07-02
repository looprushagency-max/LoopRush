'use client'

import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

export function Logo({ size = 'md', href = '/' }: LogoProps) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  }

  const content = (
    <span className={`font-black tracking-tight ${sizes[size]}`}>
      <span className="text-tiktok-red">Loop Rush</span>
      <span className="text-white"> Agency</span>
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
