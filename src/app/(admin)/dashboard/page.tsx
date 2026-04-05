import { supabase } from '@/lib/db'
import Link from 'next/link'

export default async function DashboardPage() {
  const { count } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  return (
    <main className="min-h-screen bg-[#1a1008] text-white p-8">
      <h1 className="text-3xl font-bold text-[#c8a97e] mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="bg-[#2a1f0f] rounded-2xl p-6 shadow-lg">
          <p className="text-gray-400 text-sm">Total Products</p>
          <p className="text-4xl font-bold text-[#c8a97e] mt-2">{count ?? 0}</p>
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <Link
          href="/products"
          className="bg-[#c8a97e] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Manage Products
        </Link>
        <Link
          href="/products/add"
          className="border border-[#c8a97e] text-[#c8a97e] px-6 py-3 rounded-xl font-semibold hover:opacity-90"
        >
          Add Product
        </Link>
      </div>
    </main>
  )
}