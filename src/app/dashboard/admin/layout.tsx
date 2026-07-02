import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/Sidebar'

export default async function AdminDashboardLayout({
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

  // Only admins can access this dashboard
  if (profile?.role !== 'admin') {
    redirect('/dashboard/creator')
  }

  return (
    <div className="flex h-screen bg-tiktok-black overflow-hidden">
      <Sidebar role="admin" userName={profile?.full_name ?? user.email ?? ''} />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
