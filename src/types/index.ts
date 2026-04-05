export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  subcategory: string | null
  is_available: boolean
  is_trending: boolean
  is_favorite: boolean
  created_at: string
}