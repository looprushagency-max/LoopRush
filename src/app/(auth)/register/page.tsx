'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AuthCard } from '@/components/auth/AuthCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'code' | 'details'>('code')
  const [inviteCode, setInviteCode] = useState('')

  async function verifyCode() {
    if (!inviteCode.trim()) { toast.error('Please enter your invite code'); return }
    setLoading(true)
    const supabase = createClient()
    const { data, error } = await supabase
      .from('invite_codes')
      .select('*')
      .eq('code', inviteCode.trim().toUpperCase())
      .eq('is_active', true)
      .is('used_by', null)
      .single()
    if (error || !data) {
      toast.error('Invalid or already used invite code. Contact your creator manager.')
      setLoading(false)
      return
    }
    setStep('details')
    toast.success('Invite code verified! ✅')
    setLoading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string
    const fullName = formData.get('full_name') as string
    const tiktokHandle = formData.get('tiktok_handle') as string

    if (password !== confirmPassword) { toast.error('Passwords do not match'); setLoading(false); return }
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); setLoading(false); return }

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, tiktok_handle: tiktokHandle, invite_code_used: inviteCode.trim().toUpperCase() } },
    })

    if (error) { toast.error(error.message); setLoading(false); return }

    if (data.user) {
      await supabase.from('invite_codes')
        .update({ used_by: data.user.id, used_at: new Date().toISOString() })
        .eq('code', inviteCode.trim().toUpperCase())
      await supabase.from('profiles')
        .update({ tiktok_handle: tiktokHandle, invite_code_used: inviteCode.trim().toUpperCase() })
        .eq('id', data.user.id)
    }

    if (data.user && !data.session) {
      toast.success('Check your email to confirm your account!')
      router.push('/login')
    } else {
      toast.success('Welcome to Loop Rush Agency! 🚀')
      router.push('/dashboard/creator')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <AuthCard
      title={step === 'code' ? 'Join Loop Rush Agency' : 'Create Your Account'}
      subtitle={step === 'code' ? 'Enter your invite code to get started' : 'Set up your creator account'}
      footer={<>Already have an account?{' '}<Link href="/login" className="text-tiktok-red hover:underline font-medium">Sign in</Link></>}
    >
      {step === 'code' ? (
        <div className="space-y-4">
          <div className="bg-tiktok-dark border border-tiktok-border rounded-xl p-4 text-sm text-tiktok-muted text-center">
            Loop Rush Agency is <span className="text-white font-semibold">invite only</span>. Contact your creator manager to receive your unique invite code.
          </div>
          <Input
            label="Invite Code"
            placeholder="Enter your code (e.g. LR-ABC123)"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            className="text-center tracking-widest font-mono text-lg"
          />
          <Button onClick={verifyCode} variant="primary" fullWidth disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>
          <p className="text-center text-xs text-tiktok-muted">
            Do not have a code?{' '}
            <Link href="/contact" className="text-tiktok-red hover:underline">Contact us</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-tiktok-cyan/10 border border-tiktok-cyan/30 rounded-xl p-3 text-sm text-tiktok-cyan text-center">
            ✅ Invite code verified!
          </div>
          <Input label="Full Name" name="full_name" placeholder="Your name" required />
          <Input label="TikTok Handle" name="tiktok_handle" placeholder="@yourtiktok" required hint="Used to track your diamond progress" />
          <Input label="Email" name="email" type="email" placeholder="you@example.com" required />
          <Input label="Password" name="password" type="password" placeholder="Min. 8 characters" required />
          <Input label="Confirm Password" name="confirm_password" type="password" placeholder="Repeat password" required />
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      )}
    </AuthCard>
  )
}
