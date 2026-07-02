import { createClient } from '@/lib/supabase/server'

const CATEGORIES = ['General', 'Going Live', 'Growing Your Audience', 'Diamonds & Gifts', 'Battles & PK', 'Tech Setup', 'FAQ']

export default async function ResourcesPage() {
  const supabase = createClient()
  const { data: tips } = await supabase
    .from('tips')
    .select('*')
    .order('created_at', { ascending: false })

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = (tips ?? []).filter((t: any) => t.category === cat)
    return acc
  }, {} as Record<string, any[]>)

  return (
    <div className="bg-tiktok-black pt-24 min-h-screen">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
              Creator <span className="bg-gradient-to-r from-tiktok-red to-tiktok-cyan bg-clip-text text-transparent">Resources</span>
            </h1>
            <p className="text-tiktok-muted text-lg max-w-xl mx-auto">
              Tips, tricks, and answers to the most common questions about going live on TikTok.
            </p>
          </div>

          {(tips ?? []).length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <div className="text-white font-bold text-xl">Resources Coming Soon</div>
              <div className="text-tiktok-muted mt-2">Our team is putting together tips and guides. Check back soon!</div>
            </div>
          ) : (
            <div className="space-y-12">
              {CATEGORIES.map(cat => {
                const catTips = grouped[cat]
                if (!catTips?.length) return null
                return (
                  <div key={cat}>
                    <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b border-tiktok-border">{cat}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {catTips.map((tip: any) => (
                        <div key={tip.id} className="bg-tiktok-card border border-tiktok-border rounded-xl p-5 hover:border-tiktok-red/40 transition-colors">
                          <div className="text-white font-bold mb-2">{tip.title}</div>
                          {tip.content && <p className="text-tiktok-muted text-sm leading-relaxed">{tip.content}</p>}
                          {tip.media_url && tip.media_type === 'image' && <img src={tip.media_url} alt={tip.title} className="mt-3 rounded-lg w-full object-cover max-h-64" />}
                          {tip.media_url && tip.media_type === 'video' && <video src={tip.media_url} controls className="mt-3 rounded-lg w-full" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
