"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, Package, ImageIcon, MessageSquare, Flame } from "lucide-react"
import { logoutAdmin } from "@/app/actions/auth"

interface AdminNavProps {
  userEmail: string
}

export function AdminNav({ userEmail }: AdminNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await logoutAdmin()
    router.push("/login")
    router.refresh()
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
    { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  ]

  return (
    <nav className="border-b bg-stone-900 border-stone-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2 font-serif font-bold text-xl text-amber-50">
              <Flame className="w-5 h-5 text-amber-500" />
              Frafiks Admin
            </Link>
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive ? "text-amber-500" : "text-stone-400 hover:text-amber-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone-400 hidden sm:inline">{userEmail}</span>
            <Button variant="outline" size="sm" asChild className="border-stone-700 text-stone-300 hover:bg-stone-800">
              <Link href="/">View Site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-stone-400 hover:text-amber-50 hover:bg-stone-800">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
