'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    is_available: true,
  })

  // Submit Logic: Sending data to the API
  const handleSubmit = async () => {
    if (!form.name || !form.price) return alert("Please fill in basic details")
    
    setLoading(true)
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      })

      if (res.ok) {
        router.push('/products')
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to add product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen text-white p-6 md:p-12" style={{ background: '#090909' }}>
      {/* Dynamic Background Element */}
      <div className="fixed -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Breadcrumb & Header */}
        <header className="mb-12">
          <Link href="/products" className="text-amber-500/40 hover:text-amber-500 text-[10px] tracking-[0.4em] uppercase mb-4 block transition-all">
            ← Back to Inventory
          </Link>
          <h1 className="text-4xl font-serif italic tracking-tight">
            Add New Masterpiece<span className="text-amber-500 not-italic">.</span>
          </h1>
          <p className="text-white/20 text-xs mt-2 uppercase tracking-widest font-light">Introduce a new flavor to the Tetra collection</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Form Section */}
          <div className="lg:col-span-3 space-y-6 bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-xl">
            {[
              { label: 'Product Name', key: 'name', placeholder: 'e.g. Spanish Latte' },
              { label: 'Category', key: 'category', placeholder: 'e.g. Cold Drinks' },
              { label: 'Price (EGP)', key: 'price', placeholder: '0.00' },
              { label: 'Image URL', key: 'image_url', placeholder: 'https://...' },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className="group">
                <label className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold mb-3 block group-focus-within:text-amber-500 transition-colors">
                  {label}
                </label>
                <input
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-amber-500/40 focus:bg-white/[0.05] transition-all"
                  value={(form as any)[key]}
                  placeholder={placeholder}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            ))}

            <div className="group">
              <label className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-bold mb-3 block group-focus-within:text-amber-500 transition-colors">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-amber-500/40 focus:bg-white/[0.05] transition-all resize-none"
                value={form.description}
                placeholder="Describe the aroma and taste profile..."
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] transition-all hover:bg-amber-500 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Publish Product'}
            </button>
          </div>

          {/* Real-time Preview Section */}
          <div className="lg:col-span-2">
             <div className="sticky top-24">
                <p className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-bold mb-6 px-2 text-center">Live Preview</p>
                <div className="relative group overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/5 aspect-[4/5] flex flex-col justify-end p-8">
                   {/* Background Image Preview */}
                   {form.image_url ? (
                     <img src={form.image_url} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                   ) : (
                     <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-white/5 m-4 rounded-[2rem]">
                        <span className="text-[10px] text-white/10 uppercase tracking-widest italic">Waiting for image URL...</span>
                     </div>
                   )}
                   
                   {/* Info Overlay */}
                   <div className="relative z-10">
                      <span className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">{form.category || 'Category'}</span>
                      <h3 className="text-3xl font-serif italic text-white mt-1 leading-tight">{form.name || 'Product Name'}</h3>
                      <p className="text-2xl font-serif text-white/80 mt-2">{form.price || '0'} <span className="text-xs font-sans not-italic text-white/40 uppercase">EGP</span></p>
                   </div>

                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                </div>
                <p className="text-[8px] text-white/10 uppercase mt-6 text-center tracking-[0.5em]">TETRA Visual Studio</p>
             </div>
          </div>

        </div>

      </div>
    </main>
  )
}