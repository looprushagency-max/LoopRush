'use client'

import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Target, Heart, Zap } from 'lucide-react'
import type { Metadata } from 'next'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function AboutPage() {
  return (
    <div className="bg-tiktok-black pt-24">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-tiktok-card border border-tiktok-border rounded-full px-4 py-2 text-sm text-tiktok-red font-medium mb-8"
          >
            <Heart size={14} />
            Our Story
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6"
          >
            Built by Creators,{' '}
            <span className="text-gradient">For Creators</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-tiktok-muted text-lg leading-relaxed max-w-2xl mx-auto"
          >
            {siteConfig.about.mission}
          </motion.p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-tiktok-dark">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black text-white mb-6">The Story</h2>
              <p className="text-tiktok-muted leading-relaxed text-base">
                {siteConfig.about.story}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                { icon: <Target />, label: 'Our Mission', text: 'Democratize creator monetization' },
                { icon: <Heart />, label: 'Our Values', text: 'Creator-first, always' },
                { icon: <Zap />, label: 'Our Promise', text: 'Fast, fair, transparent' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 bg-tiktok-card border border-tiktok-border rounded-xl p-4"
                >
                  <div className="text-tiktok-red w-10 h-10 flex items-center justify-center bg-tiktok-red/10 rounded-lg flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-tiktok-muted font-medium uppercase tracking-wide">
                      {item.label}
                    </div>
                    <div className="text-white font-semibold">{item.text}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Meet the <span className="text-gradient">Team</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {siteConfig.about.team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-tiktok-card border border-tiktok-border rounded-2xl p-6 text-center hover:border-tiktok-red/40 transition-colors"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-tiktok-red to-tiktok-cyan mx-auto mb-4 flex items-center justify-center text-2xl font-black text-white">
                  {member.name[0]}
                </div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <div className="text-tiktok-red text-sm font-medium mt-1 mb-3">
                  {member.role}
                </div>
                <p className="text-tiktok-muted text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
