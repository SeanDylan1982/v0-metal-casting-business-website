import type React from "react"
import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user = null

  try {
    const supabase = await getSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (error) {
    console.error("[v0] Error getting user:", error)
    // Redirect to setup page if env vars are missing
    redirect("/setup")
  }

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav userEmail={user.email || ""} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
