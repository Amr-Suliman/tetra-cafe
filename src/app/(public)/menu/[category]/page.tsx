import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

const SLUG_TO_CATEGORY: Record<string, string> = {
  'hot-drinks': 'Hot Drinks',
  'cold-drinks': 'Cold Drinks',
  'desserts': 'Desserts',
}

const CATEGORY_TO_SLUG: Record<string, string> = {
  'Hot Drinks': 'hot-drinks',
  'Cold Drinks': 'cold-drinks',
  'Desserts': 'desserts',
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const categoryName = SLUG_TO_CATEGORY[category] ?? category

  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)
    .eq('category', categoryName)

  return (
    <main className="min-h-screen text-white" style={{ background: 'var(--tetra-bg)' }}>

      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-4 flex items-center gap-4"
        style={{
          background: 'rgba(6,4,0,0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--tetra-border)',
        }}
      >
        <Link href="/menu" className="hover:opacity-70 transition-opacity"
          style={{ color: 'var(--tetra-gold)' }}>
          ←
        </Link>
        <h1 className="text-base font-semibold tracking-widest uppercase"
          style={{ color: 'var(--tetra-gold)' }}>
          {categoryName}
        </h1>
      </div>

      {/* Products */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        {products?.map((product: Product) => (
          <Link
            key={product.id}
            href={`/menu/${category}/${product.name.toLowerCase().replace(/ /g, '-')}`}
          >
            <div
              className="flex gap-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: 'var(--tetra-bg-card)',
                border: '1px solid var(--tetra-border)',
              }}
            >
              {product.image_url && (
                <div className="relative w-28 h-28 flex-shrink-0">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h2 className="text-base font-semibold text-white/90">{product.name}</h2>
                <p className="text-xs mt-1 leading-relaxed text-white/40">
                  {product.description}
                </p>
                <p className="font-bold mt-2 text-sm" style={{ color: 'var(--tetra-gold)' }}>
                  {product.price} EGP
                </p>
              </div>
              <div className="flex items-center pr-4">
                <span className="text-white/20 text-lg">›</span>
              </div>
            </div>
          </Link>
        ))}

        {products?.length === 0 && (
          <p className="text-center py-20 text-white/20">
            No items in this category yet
          </p>
        )}
      </div>
    </main>
  )
}