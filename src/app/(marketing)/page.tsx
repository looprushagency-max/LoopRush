'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'
import { ArrowRight } from 'lucide-react'
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }) }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
export default function HomePage() {
  return (
    <div className="bg-tiktok-black">
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-tiktok-card border border-tiktok-cyan/30 rounded-full px-4 py-2 text-sm text-tiktok-cyan font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-tiktok-cyan animate-pulse" />Official TikTok Creator Network Partner
          </div>
          <h1 className="text-5xl sm:text-7xl font-black leading-none tracking-tight mb-6">
            <span className="text-white">Go Live.</span><br />
            <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">Earn More.</span><br />
            <span className="text-white">Grow Faster.</span>
          </h1>
          <p className="text-lg text-tiktok-muted max-w-2xl mx-auto mb-10">Loop Rush Agency is an official TikTok Creator Network partner helping live creators earn exclusive monthly bonuses and grow their audience. <span className="text-white font-semibold">We never take a single diamond from you.</span></p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact"><Button variant="primary" size="lg">Apply Now <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
            <Link href="/how-it-works"><Button variant="outline" size="lg">See How It Works</Button></Link>
          </div>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{value:"0%",label:"Agency Cut"},{value:"100%",label:"Your Diamonds"},{value:"FREE",label:"TikTok Promotions"},{value:"$100*",label:"New Creator Bonus"}].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">{stat.value}</div>
                <div className="mt-1 text-sm text-tiktok-muted">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-tiktok-muted">*Earn 200K diamonds in your first month to qualify</p>
        </div>
      </section>
      <section className="py-16 px-4 bg-tiktok-dark">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-tiktok-cyan/10 to-tiktok-red/10 border border-tiktok-cyan/20 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">💎</div>
          <h2 className="text-2xl font-black text-white mb-4">Your Diamonds. Always.</h2>
          <p className="text-tiktok-muted leading-relaxed max-w-2xl mx-auto">When you go LIVE, viewers send gifts. Those gifts turn into diamonds. <span className="text-white font-semibold">TikTok pays YOU directly for every diamond you earn.</span> Separately, TikTok pays Loop Rush Agency a bonus on the backend. We never see your diamonds. We never touch your earnings. <span className="text-tiktok-cyan font-semibold">If any agency asks for a cut of your gifts — that is a scam.</span></p>
        </div>
      </section>
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">Monthly <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">Bonus Structure</span></h2>
            <p className="text-tiktok-muted text-lg max-w-2xl mx-auto">The more you stream, the bigger the reward. Bonuses paid at end of every month.</p>
          </div>
          <div className="space-y-4">
            {siteConfig.bonusTiers.map((tier) => (
              <div key={tier.name} className="bg-tiktok-card border border-tiktok-border rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
                <div className="text-4xl">{tier.emoji}</div>
                <div className="flex-1 text-center sm:text-left"><div className="text-white font-bold text-lg">{tier.name}</div><div className="text-tiktok-muted text-sm">{tier.reward}</div></div>
                <div className="flex gap-6 text-center">
                  <div><div className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent font-black text-xl">{tier.diamondsLabel}</div><div className="text-tiktok-muted text-xs">Diamonds</div></div>
                  <div><div className="text-white font-black text-xl">{tier.liveDays}</div><div className="text-tiktok-muted text-xs">Live Days</div></div>
                  <div><div className="text-white font-black text-xl">{tier.liveHours}h</div><div className="text-tiktok-muted text-xs">Live Hours</div></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-gradient-to-r from-tiktok-red/20 to-tiktok-cyan/20 border border-tiktok-red/40 rounded-2xl p-5 flex items-center gap-4">
            <div className="text-4xl">🎁</div>
            <div className="flex-1"><div className="text-white font-bold">New Creator Welcome Bonus ✱</div><div className="text-tiktok-muted text-sm">Earn 200K diamonds in your first month and receive a $100 gift on us!</div></div>
            <div className="text-tiktok-red font-black text-xl">$100*</div>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {siteConfig.bonusNotes.map((note, i) => (<div key={i} className="bg-tiktok-card border border-tiktok-border rounded-xl p-3 text-xs text-tiktok-muted text-center">⭐ {note}</div>))}
          </div>
        </div>
      </section>
      <section className="py-24 px-4 bg-tiktok-dark">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl font-black text-white mb-4">Everything We <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">Offer You</span></h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.features.map((feature) => (
              <div key={feature.title} className="bg-tiktok-card border border-tiktok-border rounded-2xl p-6 hover:border-tiktok-red/40 transition-colors group">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-tiktok-red transition-colors">{feature.title}</h3>
                <p className="text-tiktok-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-3xl font-black text-white mb-4">Joining is <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">Simple</span></h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {step:"01",emoji:"📋",title:"Apply",desc:"Fill out our contact form and tell us about your TikTok live journey. Our team reviews every application."},
              {step:"02",emoji:"💬",title:"Receive Your Invite",desc:"A creator manager will reach out to you directly with a personal invite and your unique access code."},
              {step:"03",emoji:"✅",title:"Accept on TikTok",desc:"Accept the official agency invite through TikTok and unlock your dashboard, bonuses, and full agency support."},
            ].map((item) => (
              <div key={item.step} className="text-center bg-tiktok-card border border-tiktok-border rounded-2xl p-8 hover:border-tiktok-red/40 transition-colors">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <div className="text-tiktok-red text-xs font-bold tracking-widest uppercase mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-tiktok-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl bg-gradient-to-br from-tiktok-red/20 to-tiktok-cyan/20 border border-tiktok-border p-12">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Join?</h2>
            <p className="text-tiktok-muted text-lg mb-8 max-w-xl mx-auto">Join creators already building their dream careers on Loop Rush Agency.</p>
            <Link href="/contact"><Button variant="primary" size="lg">Apply Now <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
            <p className="mt-4 text-xs text-tiktok-muted">Invite only · No fees · No contracts</p>
          </div>
        </div>
      </section>
    </div>
  )
}
