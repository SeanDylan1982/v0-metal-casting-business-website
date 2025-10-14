import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Product } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProductsTable } from "@/components/admin/products-table"
import GoogleAnalytics from "@/components/GoogleAnalytics"

export default async function ProductsPage() {
  const supabase = await getSupabaseServerClient()

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      <GoogleAnalytics />
      <ProductsTable products={(products as Product[]) || []} />
    </div>
  )
}
