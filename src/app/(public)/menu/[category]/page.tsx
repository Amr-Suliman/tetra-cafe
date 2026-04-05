import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)

  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)
    .eq('category', decodedCategory)

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
        <Link href="/menu" className="text-[#c8a97e] hover:opacity-70 transition-opacity">
          ← Back
        </Link>
        <h1 className="text-lg font-semibold text-[#c8a97e] tracking-widest uppercase">
          {decodedCategory}
        </h1>
      </div>

      {/* Products */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-3">
        {products?.map((product: Product) => (
          <Link
            key={product.id}
            href={`/menu/${encodeURIComponent(decodedCategory)}/${encodeURIComponent(product.name)}`}
          >
            <div
              className="flex gap-4 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(30,18,4,0.9), rgba(20,12,2,0.9))',
                border: '1px solid rgba(200,169,126,0.08)',
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
                <h2 className="text-base font-semibold text-white">{product.name}</h2>
                <p className="text-xs mt-1 leading-relaxed"
                  style={{ color: 'rgba(200,169,126,0.5)' }}>
                  {product.description}
                </p>
                <p className="text-[#c8a97e] font-bold mt-2">{product.price} EGP</p>
              </div>
              <div className="flex items-center pr-4">
                <span style={{ color: 'rgba(200,169,126,0.4)' }}>›</span>
              </div>
            </div>
          </Link>
        ))}

        {products?.length === 0 && (
          <p className="text-center py-20" style={{ color: 'rgba(200,169,126,0.3)' }}>
            No items in this category yet
          </p>
        )}
      </div>
    </main>
  )
}