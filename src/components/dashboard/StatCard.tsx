'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: ReactNode
  accentColor?: 'red' | 'cyan'
}

export function StatCard({
  label,
  value,
  change,
  trend = 'neutral',
  icon,
  accentColor = 'red',
}: StatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-tiktok-card border border-tiktok-border rounded-2xl p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            accentColor === 'cyan'
              ? 'bg-tiktok-cyan/10 text-tiktok-cyan'
              : 'bg-tiktok-red/10 text-tiktok-red'
          }`}
        >
          {icon}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-medium ${
              trend === 'up'
                ? 'text-green-400'
                : trend === 'down'
                ? 'text-red-400'
                : 'text-tiktok-muted'
            }`}
          >
            {trend === 'up' && <TrendingUp size={12} />}
            {trend === 'down' && <TrendingDown size={12} />}
            {change}
          </div>
        )}
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="text-tiktok-muted text-sm mt-1">{label}</div>
    </motion.div>
  )
}
