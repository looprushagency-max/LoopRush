'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'For creators just getting started',
    features: ['Basic bonus tracker', 'Access to resources', 'Community support', 'Creator profile'],
    cta: 'Apply Now',
    highlighted: false,
    href: '/contact',
  },
  {
    name: 'Agency Creator',
    price: 'Invite Only',
    period: '',
    description: 'For creators accepted into Loop Rush Agency',
    features: ['Full bonus tracker dashboard', 'Monthly diamond bonuses', 'Free TikTok promotions', 'Dedicated creator manager', 'Tips and resources library', 'New creator $100 welcome bonus'],
    cta: 'Apply to Join',
    highlighted: true,
    href: '/contact',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-tiktok-black pt-24">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Simple, <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">Transparent</span>
            </h1>
            <p className="text-tiktok-muted text-lg max-w-xl mx-auto">
              We never charge creators. We never take a cut. TikTok pays us separately for supporting you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {plans.map((plan, i) => (
              <motion.div key={plan.name}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 border ${plan.highlighted ? 'bg-gradient-to-b from-tiktok-red/10 to-tiktok-card border-tiktok-red shadow-[0_0_50px_rgba(254,44,85,0.2)]' : 'bg-tiktok-card border-tiktok-border'}`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-tiktok-red text-white text-xs font-bold px-4 py-1.5 rounded-full">AGENCY CREATORS</div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-tiktok-muted text-sm mb-6">{plan.description}</p>
                <div className="text-4xl font-black text-white mb-8">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check size={16} className={`mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-tiktok-red' : 'text-tiktok-cyan'}`} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button variant={plan.highlighted ? 'primary' : 'outline'} fullWidth>{plan.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-tiktok-muted text-sm">Have questions? <Link href="/contact" className="text-tiktok-red hover:underline">Contact our team</Link></p>
          </div>
        </div>
      </section>
    </div>
  )
}
