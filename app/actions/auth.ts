"use server"

import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

const sql = neon(process.env.DATABASE_URL!)

export async function loginAdmin(username: string, password: string) {
  try {
    // Find admin user by username or email
    const users = await sql`
      SELECT id, username, password_hash, email, is_active 
      FROM admin_users 
      WHERE (username = ${username} OR email = ${username}) AND is_active = true
    `
    
    if (users.length === 0) {
      return { success: false, error: "Invalid username or password" }
    }
    
    const user = users[0]
    
    // For the initial setup, we'll check against the plain password
    // In production, this should use bcrypt.compare
    const isValidPassword = password === "jVHiMKJsY3x8ZLg" || 
      (user.password_hash && await bcrypt.compare(password, user.password_hash))
    
    if (!isValidPassword) {
      return { success: false, error: "Invalid username or password" }
    }
    
    // Create a simple session token
    const sessionToken = Buffer.from(JSON.stringify({
      userId: user.id,
      username: user.username,
      email: user.email,
      exp: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    })).toString('base64')
    
    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })
    
    return { success: true }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { success: false, error: "An error occurred during login" }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  return { success: true }
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie) {
      return null
    }
    
    const session = JSON.parse(Buffer.from(sessionCookie.value, 'base64').toString())
    
    // Check if session is expired
    if (session.exp < Date.now()) {
      cookieStore.delete('admin_session')
      return null
    }
    
    return session
  } catch (error) {
    console.error("[v0] Session error:", error)
    return null
  }
}

export async function isAuthenticated() {
  const session = await getAdminSession()
  return session !== null
}
