"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

export async function getGalleryItems() {
  const sql = neon(process.env.DATABASE_URL!)
  const items = await sql`
    SELECT * FROM gallery
    ORDER BY display_order ASC
  `
  return items
}

export async function getVisibleGalleryItems() {
  const sql = neon(process.env.DATABASE_URL!)
  const items = await sql`
    SELECT * FROM gallery
    WHERE is_visible = true
    ORDER BY display_order ASC
    LIMIT 8
  `
  return items
}

export async function getGalleryCount() {
  const sql = neon(process.env.DATABASE_URL!)
  const result = await sql`SELECT COUNT(*) as count FROM gallery`
  return Number.parseInt(result[0].count as string)
}

export async function createGalleryItem(data: {
  title: string
  description?: string
  image_url: string
  display_order: number
}) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    INSERT INTO gallery (title, description, image_url, display_order, is_visible)
    VALUES (${data.title}, ${data.description || null}, ${data.image_url}, ${data.display_order}, true)
  `
  revalidatePath("/admin/gallery")
  revalidatePath("/")
}

export async function deleteGalleryItem(id: string) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`DELETE FROM gallery WHERE id = ${id}`
  revalidatePath("/admin/gallery")
  revalidatePath("/")
}

export async function toggleGalleryVisibility(id: string, currentVisibility: boolean) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    UPDATE gallery
    SET is_visible = ${!currentVisibility}
    WHERE id = ${id}
  `
  revalidatePath("/admin/gallery")
  revalidatePath("/")
}
