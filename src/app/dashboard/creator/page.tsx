import { createClient } from '@/lib/supabase/server'
import { BonusTracker } from '@/components/bonus/BonusTracker'
import { redirect } from 'next/navigation'

function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7)
}

export default async function CreatorDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  if (profile?.role === 'admin') redirect('/dashboard/admin')

  const { data: stats } = await supabase
    .from('creator_stats').select('*')
    .eq('creator_id', user.id).eq('month', getCurrentMonth()).single()

  const { count } = await supabase
    .from('creator_stats').select('*', { count: 'exact', head: true })
    .eq('creator_id', user.id)

  const firstName = profile?.full_name?.split(' ')[0] ?? 'Creator'
  const diamonds = stats?.diamonds ?? 0
  const liveDays = stats?.live_days ?? 0
  const liveHours = stats?.live_hours ?? 0
  const isNewCreator = (count ?? 0) <= 1

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-black text-white">Hey, {firstName} 👋</h1>
        <p className="text-tiktok-muted mt-1">
          Your progress for {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}.
        </p>
      </div>

      {!profile?.tiktok_handle ? (
        <div className="bg-tiktok-red/10 border border-tiktok-red/30 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <div className="text-white font-semibold text-sm">TikTok Account Not Connected</div>
            <div className="text-tiktok-muted text-xs">Contact your creator manager to link your TikTok so your stats update automatically.</div>
          </div>
        </div>
      ) : (
        <div className="bg-tiktok-cyan/10 border border-tiktok-cyan/20 rounded-xl p-4 flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <div className="text-white font-semibold text-sm">TikTok Connected</div>
            <div className="text-tiktok-cyan text-xs">@{profile.tiktok_handle} — Stats update automatically during your streams</div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold text-white mb-4">💎 Your Bonus Progress</h2>
        <BonusTracker
          diamonds={diamonds}
          liveDays={liveDays}
          liveHours={liveHours}
          isNewCreator={isNewCreator}
          firstMonthDiamonds={diamonds}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="/resources" className="bg-tiktok-card border border-tiktok-border rounded-xl p-5 hover:border-tiktok-red/40 transition-colors group">
          <div className="text-3xl mb-3">📚</div>
          <div className="text-white font-bold group-hover:text-tiktok-red transition-colors">Tips & Resources</div>
          <div className="text-tiktok-muted text-sm mt-1">Live streaming tips, tricks and FAQs</div>
        </a>
        <a href="/contact" className="bg-tiktok-card border border-tiktok-border rounded-xl p-5 hover:border-tiktok-red/40 transition-colors group">
          <div className="text-3xl mb-3">💬</div>
          <div className="text-white font-bold group-hover:text-tiktok-red transition-colors">Contact Your Manager</div>
          <div className="text-tiktok-muted text-sm mt-1">Get fast answers from the team</div>
        </a>
      </div>
    </div>
  )
}
