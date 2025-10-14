import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ImageIcon, MessageSquare, Tag } from "lucide-react"
import Link from "next/link"
import { getProductsCount } from "@/app/actions/products"
import { getCategoriesCount } from "@/app/actions/categories"
import { getGalleryCount } from "@/app/actions/gallery"
import { getInquiriesCount, getRecentInquiries } from "@/app/actions/inquiries"
import GoogleAnalytics from "@/components/GoogleAnalytics.tsx";

export default async function AdminDashboard() {
  const supabase = await getSupabaseServerClient()

  const [productsCount, categoriesCount, galleryCount, inquiriesCount, recentInquiries] = await Promise.all([
    getProductsCount(),
    getCategoriesCount(),
    getGalleryCount(),
    getInquiriesCount(),
    getRecentInquiries(5),
  ])

  const stats = [
    {
      title: "Total Products",
      value: productsCount || 0,
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "Categories",
      value: categoriesCount || 0,
      icon: Tag,
      href: "/admin/products",
    },
    {
      title: "Gallery Items",
      value: galleryCount || 0,
      icon: ImageIcon,
      href: "/admin/gallery",
    },
    {
      title: "Inquiries",
      value: inquiriesCount || 0,
      icon: MessageSquare,
      href: "/admin/inquiries",
    },
  ]

  return (
    <GoogleAnalytics />
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard. Manage your website content here.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {recentInquiries && recentInquiries.length > 0 ? (
            <div className="space-y-4">
              {recentInquiries.map((inquiry: any) => (
                <div key={inquiry.id} className="flex items-start justify-between border-b pb-4 last:border-0">
                  <div className="space-y-1">
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    <p className="text-sm line-clamp-2">{inquiry.message}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        inquiry.status === "new"
                          ? "bg-blue-100 text-blue-700"
                          : inquiry.status === "read"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {inquiry.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(inquiry.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No inquiries yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
