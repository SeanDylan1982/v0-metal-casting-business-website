"use server"

import { neon } from "@neondatabase/serverless"

export async function getCategories() {
  const sql = neon(process.env.DATABASE_URL!)
  const categories = await sql`
    SELECT * FROM categories
    ORDER BY display_order ASC
  `
  return categories
}

export async function getCategoriesCount() {
  const sql = neon(process.env.DATABASE_URL!)
  const result = await sql`SELECT COUNT(*) as count FROM categories`
  return Number.parseInt(result[0].count as string)
}
