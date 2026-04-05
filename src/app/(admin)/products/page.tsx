import { supabase } from '@/lib/db'
import { Product } from '@/types'
import Link from 'next/link'

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-[#1a1008] text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#c8a97e]">Products</h1>
        <Link
          href="/products/add"
          className="bg-[#c8a97e] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90"
        >
          + Add Product
        </Link>
      </div>

      <div className="max-w-4xl space-y-4">
        {products?.map((product: Product) => (
          <div
            key={product.id}
            className="bg-[#2a1f0f] rounded-2xl p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold text-[#c8a97e]">
                {product.name}
              </h2>
              <p className="text-gray-400 text-sm">{product.category}</p>
              <p className="text-white font-bold mt-1">{product.price} EGP</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/products/edit/${product.id}`}
                className="border border-[#c8a97e] text-[#c8a97e] px-4 py-2 rounded-xl text-sm hover:opacity-90"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}

        {products?.length === 0 && (
          <p className="text-gray-400 text-center mt-20">
            No products yet. Add your first product!
          </p>
        )}
      </div>
    </main>
  )
}