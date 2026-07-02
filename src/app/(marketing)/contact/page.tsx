'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Mail, MessageSquare, Twitter } from 'lucide-react'
import { siteConfig } from '@/config/site'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    // TODO: Connect to your email service (Resend, Mailgun, etc.)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success("Message sent! We'll get back to you within 24 hours.")
    setLoading(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div className="bg-tiktok-black pt-24">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-tiktok-muted text-lg max-w-xl mx-auto">
              Have a question or want to partner? We respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Let&apos;s Connect
                </h2>
                <p className="text-tiktok-muted leading-relaxed">
                  Whether you&apos;re a creator looking to join, a brand wanting to partner, or just curious — we&apos;d love to hear from you.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <Mail size={20} />, label: 'Email', value: 'hello@looprush.com' },
                  { icon: <MessageSquare size={20} />, label: 'Discord', value: 'discord.gg/looprush' },
                  { icon: <Twitter size={20} />, label: 'Twitter', value: '@looprush' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 bg-tiktok-card border border-tiktok-border rounded-xl p-4"
                  >
                    <div className="text-tiktok-red w-10 h-10 flex items-center justify-center bg-tiktok-red/10 rounded-lg flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-tiktok-muted font-medium">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-tiktok-card border border-tiktok-border rounded-2xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <Input
                  label="Subject"
                  name="subject"
                  placeholder="How can we help?"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us more..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-tiktok-dark border border-tiktok-border text-white placeholder-tiktok-muted focus:outline-none focus:border-tiktok-red focus:ring-1 focus:ring-tiktok-red transition-all duration-200 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
