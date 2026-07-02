'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthCard } from '@/components/auth/AuthCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import { CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/update-password`,
    })

    if (error) {
      toast.error(error.message)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <AuthCard
      title="Reset Password"
      subtitle="We'll send a reset link to your email"
      footer={
        <Link href="/login" className="text-tiktok-red hover:underline font-medium">
          ← Back to Sign In
        </Link>
      }
    >
      {sent ? (
        <div className="text-center py-4">
          <CheckCircle className="w-16 h-16 text-tiktok-cyan mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg mb-2">Check Your Email</h3>
          <p className="text-tiktok-muted text-sm">
            We sent a password reset link to your inbox. It may take a minute to arrive.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            hint="Enter the email you used to register"
          />
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}
