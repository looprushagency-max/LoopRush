'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

const CATEGORIES = ['General', 'Going Live', 'Growing Your Audience', 'Diamonds & Gifts', 'Battles & PK', 'Tech Setup', 'FAQ']

export default function AdminTipsPage() {
  const [tips, setTips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({ title: '', content: '', category: 'General', media_type: 'text' as 'text' | 'image' | 'video', media_url: '' })

  async function loadTips() {
    const supabase = createClient()
    const { data } = await supabase.from('tips').select('*').order('created_at', { ascending: false })
    setTips(data ?? [])
    setLoading(false)
  }

  useEffect(() => { loadTips() }, [])

  async function uploadFile(file: File) {
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('tips-media').upload(fileName, file)
    if (error) { toast.error('Upload failed'); setUploading(false); return }
    const { data: url } = supabase.storage.from('tips-media').getPublicUrl(fileName)
    const type = file.type.startsWith('video') ? 'video' : 'image'
    setForm(f => ({ ...f, media_url: url.publicUrl, media_type: type }))
    toast.success('File uploaded!')
    setUploading(false)
  }

  async function saveTip() {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('tips').insert({
      title: form.title, content: form.content || null,
      media_url: form.media_url || null, media_type: form.media_type,
      category: form.category, created_by: user?.id,
    })
    if (error) { toast.error('Failed to save tip'); return }
    toast.success('Tip posted!')
    setForm({ title: '', content: '', category: 'General', media_type: 'text', media_url: '' })
    setShowForm(false)
    loadTips()
  }

  async function deleteTip(id: string) {
    const supabase = createClient()
    await supabase.from('tips').delete().eq('id', id)
    toast.success('Tip deleted')
    loadTips()
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Tips & Resources</h1>
          <p className="text-tiktok-muted mt-1">Add tips, screenshots, and videos for your creators</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} variant="primary">
          <Plus size={16} className="mr-2" /> Add Tip
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-tiktok-card border border-tiktok-border rounded-2xl p-6 space-y-4"
          >
            <h3 className="text-white font-bold text-lg">New Tip or Resource</h3>
            <Input label="Title" placeholder="e.g. How to get more viewers on your stream" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-tiktok-dark border border-tiktok-border text-white focus:outline-none focus:border-tiktok-red">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Content (optional)</label>
              <textarea rows={4} placeholder="Write your tip here..." value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl bg-tiktok-dark border border-tiktok-border text-white placeholder-tiktok-muted focus:outline-none focus:border-tiktok-red resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image or Video (optional)</label>
              <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden" onChange={e => e.target.files?.[0] && uploadFile(e.target.files[0])} />
              <button onClick={() => fileRef.current?.click()} disabled={uploading}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-tiktok-border text-tiktok-muted hover:border-tiktok-red hover:text-white transition-colors w-full justify-center">
                <Upload size={18} />
                {uploading ? 'Uploading...' : form.media_url ? 'File uploaded — click to replace' : 'Click to upload image or video'}
              </button>
            </div>
            <div className="flex gap-3">
              <Button onClick={saveTip} variant="primary" disabled={uploading}>{uploading ? 'Uploading...' : 'Post Tip'}</Button>
              <Button onClick={() => setShowForm(false)} variant="ghost">Cancel</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="text-center text-tiktok-muted py-12">Loading...</div>
      ) : tips.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📚</div>
          <div className="text-white font-bold">No tips yet</div>
          <div className="text-tiktok-muted text-sm mt-2">Click Add Tip to post your first resource</div>
        </div>
      ) : (
        <div className="space-y-4">
          {tips.map(tip => (
            <motion.div key={tip.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-tiktok-card border border-tiktok-border rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-tiktok-red/20 text-tiktok-red px-2 py-0.5 rounded-full">{tip.category}</span>
                    {tip.media_type !== 'text' && <span className="text-xs text-tiktok-muted">{tip.media_type === 'image' ? '🖼 Image' : '🎥 Video'}</span>}
                  </div>
                  <div className="text-white font-bold">{tip.title}</div>
                  {tip.content && <div className="text-tiktok-muted text-sm mt-1 line-clamp-2">{tip.content}</div>}
                  {tip.media_url && tip.media_type === 'image' && <img src={tip.media_url} alt={tip.title} className="mt-3 rounded-lg max-h-48 object-cover" />}
                  {tip.media_url && tip.media_type === 'video' && <video src={tip.media_url} controls className="mt-3 rounded-lg max-h-48 w-full" />}
                </div>
                <button onClick={() => deleteTip(tip.id)} className="text-tiktok-muted hover:text-tiktok-red transition-colors flex-shrink-0">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
