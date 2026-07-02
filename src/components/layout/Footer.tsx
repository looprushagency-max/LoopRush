import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="bg-tiktok-dark border-t border-tiktok-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-tiktok-muted text-sm leading-relaxed max-w-xs">
              {siteConfig.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tiktok-muted hover:text-tiktok-red transition-colors text-sm"
              >
                TikTok
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tiktok-muted hover:text-tiktok-red transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-tiktok-muted hover:text-tiktok-red transition-colors text-sm"
              >
                Twitter
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Platform</h3>
            <ul className="space-y-3">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-tiktok-muted hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-tiktok-muted hover:text-white transition-colors text-sm"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-tiktok-muted hover:text-white transition-colors text-sm"
                >
                  Create Account
                </Link>
              </li>
              <li>
                <Link
                  href="/forgot-password"
                  className="text-tiktok-muted hover:text-white transition-colors text-sm"
                >
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-tiktok-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-tiktok-muted text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-tiktok-muted text-xs">
            Part of the TikTok Creator Network
          </p>
        </div>
      </div>
    </footer>
  )
}
