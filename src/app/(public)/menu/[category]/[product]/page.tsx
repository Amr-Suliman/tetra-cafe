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
      <main className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-center">
          <h2 className="text-3xl font-serif italic text-amber-500/40 mb-4 -mt-30">Masterpiece Not Found</h2>
          <Link href="/menu" className="group inline-flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-amber-500/50 transition-all duration-500">
              <span className="text-white/40 group-hover:text-amber-500 transition-colors group-hover:-translate-x-1 duration-300">
                ←
              </span>
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 group-hover:text-white transition-colors duration-500 font-light">
              Back to Collection
            </span>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 overflow-hidden select-none">

      {/* Background Atmosphere */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-600/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.01] blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Header Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-10 py-10 flex justify-between items-center backdrop-blur-sm">
        <Link
          href={`/menu/${encodeURIComponent(decodedCategory)}`}
          className="group flex items-center gap-4 text-[10px] tracking-[0.5em] uppercase text-white/40 hover:text-amber-500 transition-all font-bold"
        >
          <span className="group-hover:-translate-x-2 transition-transform duration-500">←</span>
          Return
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[8px] tracking-[1em] text-white/10 uppercase">Tetra Studio</span>
          <div className="h-[1px] w-8 bg-white/10" />
        </div>
      </nav>

      {/* 3D Master Layout */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left: Interactive 3D Visual */}
        <div className="relative group [perspective:2000px]">
          {/* Subtle Ambient Glow behind product */}
          <div className="absolute inset-0 bg-amber-500/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative aspect-[4/5] lg:aspect-square rounded-[3.5rem] overflow-hidden border border-white/5 bg-white/[0.02] transition-all duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)_rotateX(5deg)] group-hover:border-amber-500/20 group-hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.8)]">
            {data.image_url ? (
              <Image
                src={data.image_url}
                alt={data.name}
                fill
                priority
                className="object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center italic text-white/5 tracking-[2em]">TETRA</div>
            )}

            {/* Moving Light Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out" />
          </div>

          {/* Floating Availability Tag */}
          <div className="absolute -bottom-6 -right-6 bg-white/5 backdrop-blur-2xl border border-white/10 px-8 py-4 rounded-3xl shadow-2xl transform group-hover:translate-z-20 transition-transform">
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${data.is_available ? 'bg-amber-500' : 'bg-red-500'}`} />
              <span className="text-[10px] tracking-[0.3em] uppercase font-black text-white/80">
                {data.is_available ? 'In Store Now' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Premium Information */}
        <div className="space-y-12 py-10">
          <header className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="h-px w-12 bg-amber-500/40 group-hover:w-20 transition-all duration-700" />
              <span className="text-[10px] tracking-[0.8em] text-amber-500 uppercase font-black">{data.category}</span>
            </div>

            <h1 className="text-7xl lg:text-8xl font-serif italic tracking-tighter leading-[0.85] text-white">
              {data.name}<span className="text-amber-500 not-italic">.</span>
            </h1>

            <div className="flex items-center gap-6 pt-4">
              <span className="text-5xl font-serif italic text-white/90">{data.price}</span>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.4em] text-white/30 uppercase font-bold">EGP</span>
                <span className="text-[8px] tracking-[0.2em] text-amber-500/40 uppercase">Net Price</span>
              </div>
            </div>
          </header>

          {/* Description Section with SVG Icons */}
          <section className="space-y-10">
            <div className="relative pl-10 border-l border-white/10">
              <p className="text-2xl font-serif italic text-white/50 leading-relaxed max-w-md">
                {data.description || "An artisanal blend meticulously prepared for those who seek the extraordinary in every single drop."}
              </p>
            </div>

            {/* High-End SVG Badges */}
            <div className="flex gap-6 flex-wrap">
              {data.is_favorite && (
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-amber-500/30 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-amber-500">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/40 group-hover:text-amber-500 transition-colors">Signature Choice</span>
                </div>
              )}

              {data.is_trending && (
                <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.03] border border-white/5 group hover:border-amber-500/30 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-amber-500">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white/40 group-hover:text-amber-500 transition-colors">Trending Now</span>
                </div>
              )}
            </div>
          </section>

          {/* Luxury CTA */}
          <footer className="pt-10">
            <button className="group relative w-full overflow-hidden bg-white text-black py-7 rounded-[2.5rem] font-black uppercase tracking-[0.5em] text-[10px] transition-all hover:bg-amber-500 active:scale-95 shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)]">
              <span className="relative z-10 transition-colors group-hover:text-black">Experience Excellence</span>
              <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </button>

            <div className="flex justify-center items-center gap-4 mt-8 opacity-20">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-white" />
              <div className="w-1 h-1 rounded-full bg-white shrink-0" />
              <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-white" />
            </div>
          </footer>
        </div>

      </div>

      {/* Decorative Subliminal Edge */}
      <div className="fixed inset-0 border-[40px] border-white/[0.01] pointer-events-none z-0" />
    </main>
  )
}