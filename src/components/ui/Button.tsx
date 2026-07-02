'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-tiktok-dark'

  const variants = {
    primary:
      'bg-tiktok-red text-white hover:bg-red-500 focus:ring-tiktok-red shadow-lg hover:shadow-[0_0_30px_rgba(254,44,85,0.5)]',
    secondary:
      'bg-tiktok-cyan text-tiktok-black hover:bg-cyan-300 focus:ring-tiktok-cyan shadow-lg hover:shadow-[0_0_30px_rgba(37,244,238,0.5)]',
    outline:
      'border-2 border-tiktok-red text-tiktok-red hover:bg-tiktok-red hover:text-white focus:ring-tiktok-red',
    ghost:
      'text-white hover:bg-white/10 focus:ring-white/30',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
