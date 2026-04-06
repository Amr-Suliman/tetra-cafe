import { supabase } from '@/lib/db'
import { Product } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProductsPage() {
  // Fetch all products ordered by latest
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen text-white p-6 md:p-12" style={{ background: '#090909' }}>
      
      {/* Decorative Background Glow */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1 h-1 rounded-full bg-amber-500" />
              <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold">Inventory</p>
            </div>
            <h1 className="text-4xl font-serif italic tracking-tighter">
              Product Collection<span className="text-amber-500 not-italic">.</span>
            </h1>
          </div>
          
          <Link
            href="/products/add"
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold transition-all hover:bg-amber-500 active:scale-95"
          >
            <span className="text-xl font-light group-hover:rotate-90 transition-transform duration-300">+</span>
            <span className="text-xs uppercase tracking-widest">Add New Item</span>
          </Link>
        </div>

        {/* Products List Container */}
        <div className="space-y-4">
          {products?.map((product: Product) => (
            <div
              key={product.id}
              className="group relative flex flex-col sm:flex-row justify-between items-center bg-white/[0.02] border border-white/5 rounded-[2rem] p-5 transition-all duration-500 hover:border-amber-500/30 hover:bg-white/[0.04] overflow-hidden"
            >
              {/* Product Info & Image */}
              <div className="flex items-center gap-6 w-full sm:w-auto">
                {/* Product Thumbnail */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white/5 flex-shrink-0 border border-white/5 group-hover:border-amber-500/20 transition-all">
                  {product.image_url ? (
                    <Image 
                      src={product.image_url} 
                      alt={product.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10 text-xs italic">No Img</div>
                  )}
                </div>

                <div className="flex flex-col">
                  <h2 className="text-xl font-medium text-white/90 group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.2em]">{product.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="text-sm font-serif italic text-amber-500/80">{product.price} EGP</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 sm:mt-0 w-full sm:w-auto">
                <Link
                  href={`/products/edit/${product.id}`}
                  className="flex-1 sm:flex-none text-center border border-white/10 text-white/40 px-6 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold hover:border-amber-500/50 hover:text-amber-500 transition-all"
                >
                  Edit Item
                </Link>
                {/* You can add a Delete button here with a similar style but with a red touch if needed */}
              </div>

              {/* Background Accent Decor */}
              <div className="absolute right-0 top-0 h-full w-1 bg-amber-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
            </div>
          ))}

          {/* Empty State */}
          {products?.length === 0 && (
            <div className="py-32 text-center rounded-[3rem] border border-dashed border-white/5">
              <p className="text-white/20 text-sm tracking-[0.3em] uppercase italic italic">
                Your inventory is currently empty
              </p>
              <Link href="/products/add" className="text-amber-500/50 hover:text-amber-500 text-[10px] mt-4 block transition-colors">
                CLICK HERE TO BEGIN →
              </Link>
            </div>
          )}
        </div>

        {/* Footer Signature */}
        <footer className="mt-20 py-10 text-center">
           <p className="text-[8px] tracking-[0.6em] text-white/10 uppercase">
              Tetra Inventory Management &bull; 2026
           </p>
        </footer>
      </div>
    </main>
  )
}