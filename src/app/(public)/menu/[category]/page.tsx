import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

const SLUG_TO_CATEGORY: Record<string, string> = {
  'hot-drinks': 'Hot Drinks',
  'cold-drinks': 'Cold Drinks',
  'desserts': 'Desserts',
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
    <main className="min-h-screen bg-[#050505] text-white selection:bg-amber-500/30">
      
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(200,169,126,0.05),transparent_70%)] pointer-events-none" />

      {/* Minimalist Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/40 border-b border-white/[0.03]">
        <div className="max-w-2xl mx-auto px-6 py-8 flex items-center justify-between">
          <Link 
            href="/menu" 
            className="group flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-all"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back
          </Link>
          
          <h1 className="text-[11px] font-bold tracking-[0.6em] uppercase text-amber-500/80">
            {categoryName}
          </h1>

          <div className="w-10 h-px bg-white/5" /> {/* Visual Balance Element */}
        </div>
      </header>

      {/* Product Feed */}
      <div className="relative z-10 max-w-2xl mx-auto px-5 py-8 space-y-6">
        
        {products?.map((product: Product) => (
          <Link
            key={product.id}
            href={`/menu/${category}/${encodeURIComponent(product.name)}`}
            className="block group"
          >
            <div className="relative flex gap-6 p-4 rounded-[2rem] bg-white/[0.01] border border-white/[0.03] transition-all duration-700 group-hover:bg-white/[0.03] group-hover:border-white/10 group-hover:-translate-y-1">
              
              {/* Product Image - Fixed Ratio */}
              {product.image_url && (
                <div className="relative w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
              )}

              {/* Product Details */}
              <div className="flex-1 flex flex-col justify-center space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-sm lg:text-base font-serif italic text-white/90 tracking-tight">
                    {product.name}
                  </h2>
                  <span className="text-[10px] font-medium tracking-widest text-amber-500/60">
                    {product.price} <span className="text-[8px] opacity-50">EGP</span>
                  </span>
                </div>

                <p className="text-[11px] leading-relaxed text-white/30 font-light line-clamp-2 pr-4 group-hover:text-white/50 transition-colors">
                  {product.description || "A signature Tetra creation, balanced to perfection."}
                </p>
                
                {/* Visual Indicator */}
                <div className="pt-2">
                   <div className="h-[1px] w-0 bg-amber-500/20 group-hover:w-full transition-all duration-1000" />
                </div>
              </div>

              {/* Arrow Hover Effect */}
              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <span className="text-amber-500/50 text-xs translate-x-2 group-hover:translate-x-0 transition-transform">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </span>
              </div>
            </div>
          </Link>
        ))}

        {/* Empty State */}
        {products?.length === 0 && (
          <div className="text-center py-32 space-y-4">
            <p className="text-[10px] tracking-[0.5em] uppercase text-white/10 font-light">
              This collection is being curated
            </p>
            <div className="w-12 h-px bg-white/5 mx-auto" />
          </div>
        )}
      </div>

      {/* Decorative Branding Footnote */}
      <footer className="py-12 text-center">
         <p className="text-[7px] tracking-[1em] uppercase text-white/5">Tetra Coffee House</p>
      </footer>
    </main>
  )
}