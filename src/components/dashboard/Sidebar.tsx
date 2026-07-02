'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, TrendingUp, Users, Settings, LogOut, Shield, BarChart3, BookOpen, Ticket } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { createClient } from '@/lib/supabase/client'
import toast from 'react-hot-toast'
import type { UserRole } from '@/types'

const creatorNav = [
  { label: 'Dashboard', href: '/dashboard/creator', icon: LayoutDashboard },
  { label: 'My Bonuses', href: '/dashboard/creator/bonuses', icon: TrendingUp },
  { label: 'Resources', href: '/resources', icon: BookOpen },
  { label: 'Settings', href: '/dashboard/creator/settings', icon: Settings },
]

const adminNav = [
  { label: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
  { label: 'Creators', href: '/dashboard/admin/creators', icon: Users },
  { label: 'Invite Codes', href: '/dashboard/admin/invite-codes', icon: Ticket },
  { label: 'Tips & Resources', href: '/dashboard/admin/tips', icon: BookOpen },
  { label: 'Stats', href: '/dashboard/admin/stats', icon: BarChart3 },
  { label: 'Settings', href: '/dashboard/admin/settings', icon: Settings },
]

interface SidebarProps {
  role: UserRole
  userName?: string
}

export function Sidebar({ role, userName }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = role === 'admin' ? adminNav : creatorNav

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Signed out')
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="flex flex-col w-64 h-screen bg-tiktok-dark border-r border-tiktok-border fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-tiktok-border">
        <Logo size="md" />
        {role === 'admin' && (
          <div className="mt-2 inline-flex items-center gap-1.5 bg-tiktok-red/10 border border-tiktok-red/30 rounded-full px-2.5 py-1 text-xs font-medium text-tiktok-red">
            <Shield size={10} /> Admin
          </div>
        )}
      </div>
      <div className="px-6 py-4 border-b border-tiktok-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-tiktok-red to-tiktok-cyan flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {userName?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="overflow-hidden">
            <div className="text-white text-sm font-medium truncate">{userName ?? 'Creator'}</div>
            <div className="text-tiktok-muted text-xs capitalize">{role}</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <li key={item.href}>
                <Link href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive ? 'bg-tiktok-red/10 text-tiktok-red' : 'text-tiktok-muted hover:text-white hover:bg-white/5'}`}>
                  {isActive && <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-6 bg-tiktok-red rounded-r-full" />}
                  <Icon size={18} />{item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-3 border-t border-tiktok-border">
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-tiktok-muted hover:text-tiktok-red hover:bg-tiktok-red/10 transition-all duration-200 w-full">
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  )
}
