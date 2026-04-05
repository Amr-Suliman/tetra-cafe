import { createSupabaseServerClient } from '@/lib/supabase-server'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category, product } = await params
  const decodedCategory = decodeURIComponent(category)
  const decodedProduct = decodeURIComponent(product)

  const supabase = await createSupabaseServerClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('name', decodedProduct)
    .single()

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#0a0600' }}>
        <div className="text-center">
          <p style={{ color: 'rgba(200,169,126,0.5)' }}>Product not found</p>
          <Link href="/menu" className="text-[#c8a97e] mt-4 block">← Back to Menu</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen text-white" style={{ background: '#0a0600' }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-4 flex items-center gap-4"
        style={{
          background: 'rgba(10,6,0,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(200,169,126,0.1)',
        }}
      >
        <Link
          href={`/menu/${encodeURIComponent(decodedCategory)}`}
          className="text-[#c8a97e] hover:opacity-70 transition-opacity"
        >
          ← Back
        </Link>
      </div>

      {/* Product Image */}
      {data.image_url && (
        <div className="relative w-full h-72">
          <Image
            src={data.image_url}
            alt={data.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 40%, #0a0600)' }}
          />
        </div>
      )}

      {/* Product Info */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-white">{data.name}</h1>
          <div
            className="px-4 py-2 rounded-full text-lg font-bold shrink-0"
            style={{
              background: 'rgba(200,169,126,0.1)',
              border: '1px solid rgba(200,169,126,0.3)',
              color: '#c8a97e',
            }}
          >
            {data.price} EGP
          </div>
        </div>

        <p className="mt-4 leading-relaxed" style={{ color: 'rgba(200,169,126,0.6)' }}>
          {data.description}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#c8a97e' }} />
          <span className="text-sm" style={{ color: 'rgba(200,169,126,0.4)' }}>
            {data.category}
          </span>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,126,0.2), transparent)' }} />

        {/* Badges */}
        <div className="flex gap-3 flex-wrap">
          {data.is_favorite && (
            <div className="px-4 py-2 rounded-full text-sm"
              style={{ background: 'rgba(200,169,126,0.1)', border: '1px solid rgba(200,169,126,0.2)', color: '#c8a97e' }}>
              ⭐ Fan Favorite
            </div>
          )}
          {data.is_trending && (
            <div className="px-4 py-2 rounded-full text-sm"
              style={{ background: 'rgba(200,169,126,0.1)', border: '1px solid rgba(200,169,126,0.2)', color: '#c8a97e' }}>
              🔥 Trending
            </div>
          )}
        </div>
      </div>
    </main>
  )
}