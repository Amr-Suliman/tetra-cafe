import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Product } from '@/types'
import MenuClient from '../MenuClient'

export default async function MenuPage() {
  const supabase = await createSupabaseServerClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)

  return <MenuClient products={products || []} />
}