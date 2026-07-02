import { createClient } from '@/lib/supabase/server'
import { StatCard } from '@/components/dashboard/StatCard'
import { Users, DollarSign, BarChart3, TrendingUp } from 'lucide-react'

export default async function AdminDashboardPage() {
  const supabase = createClient()

  // Fetch platform-wide stats
  const { count: totalCreators } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'creator')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-tiktok-muted mt-1">
            Platform overview and management
          </p>
        </div>
        <div className="bg-tiktok-red/10 border border-tiktok-red/30 rounded-xl px-4 py-2 text-tiktok-red text-sm font-medium">
          🛡️ Admin Access
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Creators"
          value={String(totalCreators ?? 0)}
          trend="neutral"
          icon={<Users size={20} />}
          accentColor="red"
        />
        <StatCard
          label="Active Campaigns"
          value="0"
          trend="neutral"
          icon={<BarChart3 size={20} />}
          accentColor="cyan"
        />
        <StatCard
          label="Platform Revenue"
          value="$0"
          trend="neutral"
          icon={<DollarSign size={20} />}
          accentColor="red"
        />
        <StatCard
          label="Monthly Growth"
          value="—"
          trend="neutral"
          icon={<TrendingUp size={20} />}
          accentColor="cyan"
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Manage Creators',
            desc: 'View, approve, and manage all creator accounts on the platform.',
            href: '/dashboard/admin/creators',
            emoji: '👥',
          },
          {
            title: 'Campaign Management',
            desc: 'Create, edit, and monitor all brand campaigns.',
            href: '/dashboard/admin/campaigns',
            emoji: '📋',
          },
          {
            title: 'Revenue Reports',
            desc: 'View financial reports, payouts, and platform earnings.',
            href: '/dashboard/admin/revenue',
            emoji: '💰',
          },
        ].map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="bg-tiktok-card border border-tiktok-border rounded-2xl p-6 hover:border-tiktok-red/40 transition-colors group"
          >
            <div className="text-3xl mb-3">{card.emoji}</div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-tiktok-red transition-colors">
              {card.title}
            </h3>
            <p className="text-tiktok-muted text-sm">{card.desc}</p>
          </a>
        ))}
      </div>

      {/* Recent activity placeholder */}
      <div className="bg-tiktok-card border border-tiktok-border rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-tiktok-muted text-sm">
            Activity logs will appear here as creators join and campaigns run.
          </p>
        </div>
      </div>
    </div>
  )
}
