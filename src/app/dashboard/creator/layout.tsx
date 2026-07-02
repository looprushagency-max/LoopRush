import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/Sidebar'

export default async function CreatorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()

  // If admin tries to access creator dashboard, redirect them
  if (profile?.role === 'admin') {
    redirect('/dashboard/admin')
  }

  return (
    <div className="flex h-screen bg-tiktok-black overflow-hidden">
      <Sidebar role="creator" userName={profile?.full_name ?? user.email ?? ''} />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
