'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { Copy, Plus, Trash2, Check } from 'lucide-react'
import toast from 'react-hot-toast'

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'LR-'
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export default function InviteCodesPage() {
  const [codes, setCodes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  async function loadCodes() {
    const supabase = createClient()
    const { data } = await supabase
      .from('invite_codes')
      .select('*, used_profile:used_by(full_name, tiktok_handle)')
      .order('created_at', { ascending: false })
    setCodes(data ?? [])
    setLoading(false)
  }

  useEffect(() => { loadCodes() }, [])

  async function createCode() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const code = generateCode()
    const { error } = await supabase.from('invite_codes').insert({ code, created_by: user?.id, is_active: true })
    if (error) { toast.error('Failed to create code'); return }
    toast.success(`Code ${code} created!`)
    loadCodes()
  }

  async function deleteCode(id: string) {
    const supabase = createClient()
    await supabase.from('invite_codes').delete().eq('id', id)
    toast.success('Code deleted')
    loadCodes()
  }

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code)
    setCopied(code)
    toast.success('Copied!')
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Invite Codes</h1>
          <p className="text-tiktok-muted mt-1">Generate and manage creator invite codes</p>
        </div>
        <Button onClick={createCode} variant="primary">
          <Plus size={16} className="mr-2" /> Generate Code
        </Button>
      </div>

      <div className="bg-tiktok-dark border border-tiktok-border rounded-xl p-4 text-sm text-tiktok-muted">
        Each code can only be used <span className="text-white">once</span>. Generate a new code for each creator and send it via DM.
      </div>

      {loading ? (
        <div className="text-center text-tiktok-muted py-12">Loading...</div>
      ) : codes.length === 0 ? (
        <div className="text-center text-tiktok-muted py-12">No codes yet. Generate your first one!</div>
      ) : (
        <div className="space-y-3">
          {codes.map((code) => (
            <motion.div
              key={code.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-tiktok-card border rounded-xl p-4 flex items-center gap-4 ${code.used_by ? 'border-tiktok-border opacity-60' : 'border-tiktok-border hover:border-tiktok-red/40'}`}
            >
              <div className="font-mono text-white font-bold text-lg tracking-widest flex-1">{code.code}</div>
              <div className="flex-1 text-sm">
                {code.used_by ? (
                  <span className="text-tiktok-muted">Used by <span className="text-white">{code.used_profile?.full_name ?? 'Creator'}</span>
                    {code.used_profile?.tiktok_handle && <span className="text-tiktok-cyan"> @{code.used_profile.tiktok_handle}</span>}
                  </span>
                ) : (
                  <span className="text-green-400">Available</span>
                )}
              </div>
              <div className="flex gap-2">
                {!code.used_by && (
                  <>
                    <button onClick={() => copyCode(code.code)} className="p-2 text-tiktok-muted hover:text-white transition-colors">
                      {copied === code.code ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                    </button>
                    <button onClick={() => deleteCode(code.id)} className="p-2 text-tiktok-muted hover:text-tiktok-red transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
