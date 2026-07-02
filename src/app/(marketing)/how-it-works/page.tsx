import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

export default function HowItWorksPage() {
  return (
    <div className="bg-tiktok-black pt-24 min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              How It <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">Works</span>
            </h1>
            <p className="text-tiktok-muted text-lg max-w-xl mx-auto">
              Joining Loop Rush Agency is simple. Here is exactly what happens from application to your first bonus.
            </p>
          </div>
          <div className="space-y-6">
            {[
              { step: "01", emoji: "📋", title: "Apply", desc: "Fill out our contact form and tell us about your TikTok live journey. Let us know how long you have been streaming, your average viewership, and what goals you have. Our team reviews every application personally." },
              { step: "02", emoji: "💬", title: "Receive Your Invite", desc: "A creator manager from our team will reach out to you directly via TikTok DM with a personal message and your unique one-time invite code. This code is how you access your creator dashboard." },
              { step: "03", emoji: "✅", title: "Accept on TikTok", desc: "Accept the official Loop Rush Agency invite through TikTok. This connects your account to our agency so TikTok can track your performance and process your bonuses at the end of each month." },
              { step: "04", emoji: "📊", title: "Track Your Progress", desc: "Log in to your creator dashboard to see your diamond count, live days, and live hours update in real time. Watch your progress toward each bonus tier throughout the month." },
              { step: "05", emoji: "💎", title: "Earn Your Bonus", desc: "Hit the required diamonds, live days, and live hours for a bonus tier and receive your reward at the end of the month. The more consistent you are, the bigger the bonus." },
            ].map((item) => (
              <div key={item.step} className="bg-tiktok-card border border-tiktok-border rounded-2xl p-6 flex gap-5 hover:border-tiktok-red/40 transition-colors">
                <div className="text-4xl flex-shrink-0">{item.emoji}</div>
                <div>
                  <div className="text-tiktok-red text-xs font-bold tracking-widest uppercase mb-1">Step {item.step}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-tiktok-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-gradient-to-r from-tiktok-red/20 to-tiktok-cyan/20 border border-tiktok-border rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-white mb-4">Ready to Get Started?</h2>
            <p className="text-tiktok-muted mb-6">Apply today and a creator manager will reach out within 24-48 hours.</p>
            <Link href="/contact"><Button variant="primary" size="lg">Apply Now</Button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
