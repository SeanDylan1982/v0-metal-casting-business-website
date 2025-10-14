"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { Category, Product } from "@/lib/supabase/types"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface ProductFormProps {
  categories: Category[]
  product?: Product
}

export function ProductForm({ categories, product }: ProductFormProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-")

    const data = {
      name,
      slug: product?.slug || slug,
      description: formData.get("description") as string,
      category_id: (formData.get("category_id") as string) || null,
      price: formData.get("price") ? Number.parseFloat(formData.get("price") as string) : null,
      is_wholesale: formData.get("is_wholesale") === "on",
      is_featured: formData.get("is_featured") === "on",
      image_url: (formData.get("image_url") as string) || null,
    }

    const supabase = getSupabaseBrowserClient()

    if (product) {
      const { error } = await supabase.from("products").update(data).eq("id", product.id)

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Product updated successfully",
        })
        router.push("/admin/products")
        router.refresh()
      }
    } else {
      const { error } = await supabase.from("products").insert([data])

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Product created successfully",
        })
        router.push("/admin/products")
        router.refresh()
      }
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" defaultValue={product?.name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" defaultValue={product?.description || ""} rows={4} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category_id">Category</Label>
              <select
                id="category_id"
                name="category_id"
                defaultValue={product?.category_id || ""}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">No category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (optional)</Label>
              <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price || ""} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              defaultValue={product?.image_url || ""}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground">Enter the full URL of the product image</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="is_featured" name="is_featured" defaultChecked={product?.is_featured} />
              <Label htmlFor="is_featured" className="font-normal cursor-pointer">
                Featured product (show on homepage)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="is_wholesale" name="is_wholesale" defaultChecked={product?.is_wholesale} />
              <Label htmlFor="is_wholesale" className="font-normal cursor-pointer">
                Available for wholesale
              </Label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
