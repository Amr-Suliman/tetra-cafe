'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/db'

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

  const handleSubmit = async () => {
    setLoading(true)
    await supabase
      .from('products')
      .update({ ...form, price: Number(form.price) })
      .eq('id', id)

    router.push('/products')
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return
    await supabase.from('products').delete().eq('id', id)
    router.push('/products')
  }

  return (
    <main className="min-h-screen bg-[#1a1008] text-white p-8">
      <h1 className="text-3xl font-bold text-[#c8a97e] mb-8">Edit Product</h1>

      <div className="max-w-xl space-y-4">
        {[
          { label: 'Name', key: 'name' },
          { label: 'Description', key: 'description' },
          { label: 'Price', key: 'price' },
          { label: 'Image URL', key: 'image_url' },
          { label: 'Category', key: 'category' },
        ].map(({ label, key }) => (
          <div key={key}>
            <label className="text-sm text-gray-400 mb-1 block">{label}</label>
            <input
              className="w-full bg-[#2a1f0f] border border-[#c8a97e33] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#c8a97e]"
              value={form[key as keyof typeof form] as string}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.is_available}
            onChange={(e) => setForm({ ...form, is_available: e.target.checked })}
            className="w-4 h-4"
          />
          <label className="text-gray-400 text-sm">Available</label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#c8a97e] text-black py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Update Product'}
        </button>

        <button
          onClick={handleDelete}
          className="w-full border border-red-500 text-red-500 py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Delete Product
        </button>
      </div>
    </main>
  )
}