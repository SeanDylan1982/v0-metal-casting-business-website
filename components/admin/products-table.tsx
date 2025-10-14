"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return

    setDeleting(id)
    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
      router.refresh()
    }
    setDeleting(null)
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No products yet. Add your first product to get started.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="relative w-16 h-16 rounded overflow-hidden bg-muted">
                    {product.image_url ? (
                      <Image
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  {product.category ? (
                    <Badge variant="secondary">{product.category.name}</Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">Uncategorized</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {product.is_featured && <Badge variant="default">Featured</Badge>}
                    {product.is_wholesale && <Badge variant="outline">Wholesale</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/products/${product.id}`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
