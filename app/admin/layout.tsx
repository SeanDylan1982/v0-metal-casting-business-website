import type React from "react"
import { redirect } from "next/navigation"
import { getAdminSession } from "@/app/actions/auth"
import { AdminNav } from "@/components/admin/admin-nav"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAdminSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav userEmail={session.email || session.username} />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
