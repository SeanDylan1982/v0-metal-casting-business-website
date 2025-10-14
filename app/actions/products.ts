"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

export async function getProducts() {
  const sql = neon(process.env.DATABASE_URL!)
  const products = await sql`
    SELECT p.*, 
           json_build_object(
             'id', c.id,
             'name', c.name,
             'slug', c.slug,
             'description', c.description
           ) as category
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ORDER BY p.created_at DESC
  `
  return products
}

export async function getFeaturedProducts() {
  const sql = neon(process.env.DATABASE_URL!)
  const products = await sql`
    SELECT p.*, 
           json_build_object(
             'id', c.id,
             'name', c.name,
             'slug', c.slug,
             'description', c.description
           ) as category
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_featured = true
    ORDER BY p.created_at DESC
    LIMIT 6
  `
  return products
}

export async function getProductById(id: string) {
  const sql = neon(process.env.DATABASE_URL!)
  const products = await sql`
    SELECT p.*, 
           json_build_object(
             'id', c.id,
             'name', c.name,
             'slug', c.slug,
             'description', c.description
           ) as category
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.id = ${id}
  `
  return products[0] || null
}

export async function getProductsCount() {
  const sql = neon(process.env.DATABASE_URL!)
  const result = await sql`SELECT COUNT(*) as count FROM products`
  return Number.parseInt(result[0].count as string)
}

export async function createProduct(data: {
  name: string
  description: string
  category_id: string
  price?: number
  image_url?: string
  is_featured?: boolean
}) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    INSERT INTO products (name, description, category_id, price, image_url, is_featured)
    VALUES (${data.name}, ${data.description}, ${data.category_id}, ${data.price || null}, ${data.image_url || null}, ${data.is_featured || false})
  `
  revalidatePath("/admin/products")
  revalidatePath("/")
}

export async function updateProduct(
  id: string,
  data: {
    name: string
    description: string
    category_id: string
    price?: number
    image_url?: string
    is_featured?: boolean
  },
) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    UPDATE products
    SET name = ${data.name},
        description = ${data.description},
        category_id = ${data.category_id},
        price = ${data.price || null},
        image_url = ${data.image_url || null},
        is_featured = ${data.is_featured || false},
        updated_at = NOW()
    WHERE id = ${id}
  `
  revalidatePath("/admin/products")
  revalidatePath("/")
}

export async function deleteProduct(id: string) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`DELETE FROM products WHERE id = ${id}`
  revalidatePath("/admin/products")
  revalidatePath("/")
}
