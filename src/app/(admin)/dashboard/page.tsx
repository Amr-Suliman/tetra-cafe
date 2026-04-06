import { supabase } from '@/lib/db'
import Link from 'next/link'

export default async function DashboardPage() {
  // Fetch total count of products
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="min-h-screen text-white p-6 md:p-12 selection:bg-amber-500/30" style={{ background: '#090909' }}>
      
      {/* Background Decorative Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber-500/50" />
            <span className="text-[10px] tracking-[0.5em] text-amber-500/70 uppercase font-bold">Administration</span>
          </div>
          <h1 className="text-5xl font-serif italic tracking-tighter">
            Tetra Dashboard<span className="text-amber-500 not-italic">.</span>
          </h1>
          <p className="mt-4 text-white/30 text-xs tracking-widest uppercase font-light">Management & Inventory Overview</p>
        </header>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* Total Products Card */}
          <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-10 transition-all duration-500 hover:border-amber-500/30 hover:bg-white/[0.04]">
            {/* Background Icon Decor */}
            <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-700">
               <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
               </svg>
            </div>
            
            <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-6">Total Collection</p>
            <div className="flex items-baseline gap-4">
               <span className="text-7xl font-serif italic text-amber-500 leading-none">{count ?? 0}</span>
               <span className="text-xs text-white/20 uppercase tracking-widest">Active Items</span>
            </div>
            
            {/* Subtle Animated Line */}
            <div className="mt-10 h-px w-full bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-500/40 translate-x-[-100%] group-hover:translate-x-[0%] transition-transform duration-1000" />
            </div>
          </div>

          {/* Placeholder for more stats like 'Trending Items' or 'Categories' */}
          <div className="md:col-span-2 hidden md:block" />
        </div>

        {/* Quick Actions Section */}
        <section>
          <h2 className="text-[10px] tracking-[0.4em] text-white/20 uppercase font-bold mb-10 px-2">Global Actions</h2>
          
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Manage Link */}
            <Link
              href="/products"
              className="group relative flex items-center justify-between bg-white text-black px-10 py-6 rounded-2xl font-bold transition-all hover:bg-amber-500 active:scale-[0.98] overflow-hidden"
            >
              <span className="relative z-10 text-sm uppercase tracking-widest">Manage Inventory</span>
              <span className="relative z-10 text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
            
            {/* Add New Link */}
            <Link
              href="/products/add"
              className="group flex items-center justify-between border border-white/10 bg-white/5 text-white px-10 py-6 rounded-2xl font-bold transition-all hover:border-amber-500/50 hover:bg-white/[0.08] active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <span className="text-amber-500 text-2xl font-light group-hover:rotate-90 transition-transform duration-500">+</span>
                <span className="text-sm uppercase tracking-widest">Add New Product</span>
              </div>
            </Link>
          </div>
        </section>

        {/* Footer Signature */}
        <footer className="mt-32 pt-10 border-t border-white/5">
           <p className="text-[9px] tracking-[1em] text-white/10 uppercase text-center italic">
              Tetra Artisan Roasters &bull; Admin Panel v2.0
           </p>
        </footer>
      </div>
    </main>
  )
}