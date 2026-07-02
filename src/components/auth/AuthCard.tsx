'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-tiktok-black flex items-center justify-center px-4 py-12">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tiktok-red/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tiktok-cyan/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-tiktok-card border border-tiktok-border rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Logo size="lg" />
            <h1 className="mt-4 text-2xl font-bold text-white">{title}</h1>
            <p className="mt-2 text-tiktok-muted text-sm">{subtitle}</p>
          </div>

          {children}

          {footer && (
            <div className="mt-6 text-center text-sm text-tiktok-muted">
              {footer}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
