import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ProductForm } from "@/components/admin/product-form"
import GoogleAnalytics from "@/components/GoogleAnalytics"

export default async function NewProductPage() {
  const supabase = await getSupabaseServerClient()

  const { data: categories } = await supabase.from("categories").select("*").order("name", { ascending: true })

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product for your catalog</p>
      </div>

      <GoogleAnalytics />
      <ProductForm categories={categories || []} />
    </div>
  )
}
