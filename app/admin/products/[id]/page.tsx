import { getSupabaseServerClient } from "@/lib/supabase/server"
import { ProductForm } from "@/components/admin/product-form"
import { notFound } from "next/navigation"
import GoogleAnalytics from "../GoogleAnalytics"

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("categories").select("*").order("name", { ascending: true }),
  ])

  if (!product) {
    notFound()
  }

  return (
    <GoogleAnalytics />
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Edit Product</h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <ProductForm categories={categories || []} product={product} />
    </div>
  )
}
