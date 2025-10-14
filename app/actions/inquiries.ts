"use server"

import { neon } from "@neondatabase/serverless"
import { revalidatePath } from "next/cache"

export async function getInquiries() {
  const sql = neon(process.env.DATABASE_URL!)
  const inquiries = await sql`
    SELECT * FROM inquiries
    ORDER BY created_at DESC
  `
  return inquiries
}

export async function getRecentInquiries(limit = 5) {
  const sql = neon(process.env.DATABASE_URL!)
  const inquiries = await sql`
    SELECT * FROM inquiries
    ORDER BY created_at DESC
    LIMIT ${limit}
  `
  return inquiries
}

export async function getInquiriesCount() {
  const sql = neon(process.env.DATABASE_URL!)
  const result = await sql`SELECT COUNT(*) as count FROM inquiries`
  return Number.parseInt(result[0].count as string)
}

export async function createInquiry(data: {
  name: string
  email: string
  phone?: string
  company?: string
  inquiry_type: "retail" | "wholesale"
  message: string
}) {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    INSERT INTO inquiries (name, email, phone, company, inquiry_type, message, status)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.company || null}, ${data.inquiry_type}, ${data.message}, 'new')
  `
  revalidatePath("/admin/inquiries")
}

export async function updateInquiryStatus(id: string, status: "new" | "read" | "responded") {
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    UPDATE inquiries
    SET status = ${status}
    WHERE id = ${id}
  `
  revalidatePath("/admin/inquiries")
}
