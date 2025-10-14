export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  category_id: string | null
  price: number | null
  is_wholesale: boolean
  is_featured: boolean
  image_url: string | null
  created_at: string
  updated_at: string
  category?: Category
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  display_order: number
  created_at: string
}

export interface GalleryItem {
  id: string
  title: string | null
  image_url: string
  description: string | null
  display_order: number
  is_visible: boolean
  created_at: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  inquiry_type: "retail" | "wholesale"
  message: string
  status: "new" | "read" | "responded"
  created_at: string
}
