'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/db'
import Link from 'next/link'

export default function EditProductPage() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    is_available: true,
  })

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setForm({ ...data, price: String(data.price) })
      }
    }
    fetchProduct()
  }, [id])

  // Handle Update logic
  const handleSubmit = async () => {
    setLoading(true)
    try {
      await supabase
        .from('products')
        .update({ 
          ...form, 
          price: Number(form.price),
          updated_at: new Date().toISOString() 
        })
        .eq('id', id)

      router.push('/products')
      router.refresh() // Refresh server components
    } catch (error) {
      console.error('Error updating:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle Delete logic
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove this masterpiece from the menu?')) return
    
    setLoading(true)
    await supabase.from('products').delete().eq('id', id)
    router.push('/products')
    router.refresh()
  }

  return (
    <main className="min-h-screen text-white p-6 md:p-12" style={{ background: '#090909' }}>
      {/* Background Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header with Back Link */}
        <header className="mb-12">
          <Link href="/products" className="text-amber-500/50 hover:text-amber-500 text-xs tracking-[0.3em] uppercase mb-4 block transition-colors">
            ← Back to Inventory
          </Link>
          <h1 className="text-4xl font-serif italic tracking-tight">
            Edit Product<span className="text-amber-500 not-italic">.</span>
          </h1>
        </header>

        <div className="space-y-8 bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-sm">
          
          {/* Form Grid */}
          <div className="grid grid-cols-1 gap-6">
            {[
              { label: 'Product Name', key: 'name', type: 'text' },
              { label: 'Category', key: 'category', type: 'text' },
              { label: 'Price (EGP)', key: 'price', type: 'number' },
              { label: 'Image URL', key: 'image_url', type: 'url' },
            ].map(({ label, key, type }) => (
              <div key={key} className="group">
                <label className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold mb-2 block group-focus-within:text-amber-500/60 transition-colors">
                  {label}
                </label>
                <input
                  type={type}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all"
                  value={(form as any)[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={`Enter ${label.toLowerCase()}...`}
                />
              </div>
            ))}

            {/* Description Field */}
            <div className="group">
              <label className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-bold mb-2 block group-focus-within:text-amber-500/60 transition-colors">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all resize-none"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the flavors and essence..."
              />
            </div>
          </div>

          {/* Availability Toggle */}
          <div 
            className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 cursor-pointer hover:bg-white/[0.04] transition-all"
            onClick={() => setForm({ ...form, is_available: !form.is_available })}
          >
            <span className="text-xs uppercase tracking-widest text-white/60">Available in Store</span>
            <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${form.is_available ? 'bg-amber-500' : 'bg-white/10'}`}>
               <div className={`absolute top-1 w-4 h-4 rounded-full bg-black transition-all duration-300 ${form.is_available ? 'left-7' : 'left-1'}`} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all hover:bg-amber-500 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Save Changes'}
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="w-full border border-red-500/20 text-red-500/50 py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-red-500/10 hover:text-red-500 active:scale-[0.98]"
            >
              Permanently Delete Item
            </button>
          </div>
        </div>

        {/* Footer Signature */}
        <footer className="mt-12 text-center">
           <p className="text-[8px] tracking-[0.8em] text-white/5 uppercase italic">
              Tetra Luxury Management Systems
           </p>
        </footer>
      </div>
    </main>
  )
}