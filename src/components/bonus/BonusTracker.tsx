'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Diamond, Clock, Calendar, Trophy } from 'lucide-react'

interface BonusTrackerProps {
  diamonds: number
  liveDays: number
  liveHours: number
  isNewCreator?: boolean
  firstMonthDiamonds?: number
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="w-full bg-tiktok-border rounded-full h-3 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  )
}

export function BonusTracker({ diamonds, liveDays, liveHours, isNewCreator, firstMonthDiamonds }: BonusTrackerProps) {
  const currentTierIndex = siteConfig.bonusTiers.reduce((acc, tier, i) => {
    return diamonds >= tier.diamonds && liveDays >= tier.liveDays && liveHours >= tier.liveHours ? i : acc
  }, -1)

  const nextTier = siteConfig.bonusTiers[currentTierIndex + 1] ?? null
  const currentTier = siteConfig.bonusTiers[currentTierIndex] ?? null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: <Diamond size={20} />, label: 'Diamonds', value: diamonds.toLocaleString(), color: 'text-tiktok-cyan' },
          { icon: <Calendar size={20} />, label: 'Live Days', value: liveDays, color: 'text-tiktok-red' },
          { icon: <Clock size={20} />, label: 'Live Hours', value: `${liveHours}h`, color: 'text-purple-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-tiktok-dark border border-tiktok-border rounded-xl p-4 text-center">
            <div className={`${stat.color} flex justify-center mb-2`}>{stat.icon}</div>
            <div className="text-white font-black text-xl">{stat.value}</div>
            <div className="text-tiktok-muted text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {currentTier && (
        <div className="bg-gradient-to-r from-tiktok-red/10 to-tiktok-cyan/10 border border-tiktok-red/30 rounded-xl p-4 flex items-center gap-3">
          <Trophy className="text-tiktok-red w-8 h-8 flex-shrink-0" />
          <div>
            <div className="text-xs text-tiktok-muted uppercase tracking-wide">Current Tier Unlocked</div>
            <div className="text-white font-bold">{currentTier.emoji} {currentTier.name}</div>
            <div className="text-tiktok-cyan text-sm">{currentTier.reward}</div>
          </div>
        </div>
      )}

      {nextTier ? (
        <div className="bg-tiktok-card border border-tiktok-border rounded-2xl p-6 space-y-5">
          <div>
            <div className="text-xs text-tiktok-muted uppercase tracking-wide mb-1">Next Bonus</div>
            <div className="text-white font-bold text-lg">{nextTier.emoji} {nextTier.name}</div>
            <div className="text-tiktok-muted text-sm">{nextTier.reward}</div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-tiktok-muted">💎 Diamonds</span>
                <span className="text-white">{diamonds.toLocaleString()} / {nextTier.diamonds.toLocaleString()} {diamonds >= nextTier.diamonds && '✓'}</span>
              </div>
              <ProgressBar value={diamonds} max={nextTier.diamonds} color="from-tiktok-cyan to-tiktok-red" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-tiktok-muted">📅 Live Days</span>
                <span className="text-white">{liveDays} / {nextTier.liveDays} {liveDays >= nextTier.liveDays && '✓'}</span>
              </div>
              <ProgressBar value={liveDays} max={nextTier.liveDays} color="from-tiktok-red to-orange-500" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-tiktok-muted">⏱ Live Hours</span>
                <span className="text-white">{liveHours}h / {nextTier.liveHours}h {liveHours >= nextTier.liveHours && '✓'}</span>
              </div>
              <ProgressBar value={liveHours} max={nextTier.liveHours} color="from-purple-500 to-pink-500" />
            </div>
          </div>
          <div className="text-xs text-tiktok-muted bg-tiktok-dark rounded-lg p-3">
            ⚠️ You must meet <span className="text-white">ALL THREE</span> requirements to unlock this bonus.
          </div>
        </div>
      ) : currentTier ? (
        <div className="bg-gradient-to-br from-tiktok-red/20 to-tiktok-cyan/20 border border-tiktok-cyan/40 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-3">🏆</div>
          <div className="text-white font-black text-xl">Maximum Tier Reached!</div>
          <div className="text-tiktok-cyan mt-2">You have unlocked the TikTok Universe bonus!</div>
        </div>
      ) : (
        <div className="bg-tiktok-card border border-tiktok-border rounded-2xl p-6 text-center">
          <div className="text-4xl mb-3">💎</div>
          <div className="text-white font-bold mb-2">Start Earning Your First Bonus</div>
          <div className="text-tiktok-muted text-sm">Reach 100K diamonds, 12 live days, and 25 live hours to unlock Leon the Kitten!</div>
        </div>
      )}

      {isNewCreator && (
        <div className="bg-tiktok-dark border border-tiktok-red/30 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎁</span>
            <div>
              <div className="text-white font-bold text-sm">New Creator Welcome Bonus</div>
              <div className="text-tiktok-muted text-xs">Earn 200K diamonds this month for a $100 gift!</div>
            </div>
          </div>
          <ProgressBar value={firstMonthDiamonds ?? diamonds} max={200000} color="from-tiktok-red to-pink-500" />
          <div className="text-right text-xs text-tiktok-muted mt-1">{(firstMonthDiamonds ?? diamonds).toLocaleString()} / 200,000</div>
        </div>
      )}

      <div className="space-y-2">
        {siteConfig.bonusNotes.map((note, i) => (
          <div key={i} className="text-xs text-tiktok-muted flex items-start gap-2">
            <span className="text-yellow-400 flex-shrink-0">⭐</span>{note}
          </div>
        ))}
      </div>
    </div>
  )
}
