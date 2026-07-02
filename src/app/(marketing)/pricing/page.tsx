'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
import { Check } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="bg-tiktok-black pt-24">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-tiktok-card border border-tiktok-border rounded-full px-4 py-2 text-sm text-tiktok-cyan font-medium mb-6">
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              Invest in Your{' '}
              <span className="text-gradient">Creator Career</span>
            </h1>
            <p className="text-tiktok-muted text-lg max-w-xl mx-auto">
              Start free, upgrade when you&apos;re ready. No hidden fees, no surprises.
            </p>
          </motion.div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {siteConfig.plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 border ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-tiktok-red/10 to-tiktok-card border-tiktok-red shadow-[0_0_50px_rgba(254,44,85,0.2)]'
                    : 'bg-tiktok-card border-tiktok-border'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-tiktok-red text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-tiktok-muted text-sm mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  {plan.period && (
                    <span className="text-tiktok-muted text-sm">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          plan.highlighted ? 'text-tiktok-red' : 'text-tiktok-cyan'
                        }`}
                      />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/register">
                  <Button
                    variant={plan.highlighted ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <p className="text-tiktok-muted">
              Have questions?{' '}
              <Link href="/contact" className="text-tiktok-red hover:underline">
                Talk to our team
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
