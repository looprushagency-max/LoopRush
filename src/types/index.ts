export type UserRole = 'admin' | 'creator'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  role: UserRole
  bio: string | null
  tiktok_handle: string | null
  follower_count: number | null
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  profile: Profile | null
}

// ─── Site Config (edit this to update site-wide text) ───────────────────────
export interface SiteConfig {
  name: string
  tagline: string
  description: string
  url: string
  social: {
    tiktok: string
    instagram: string
    twitter: string
  }
}
