"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import type { GalleryItem } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Eye, EyeOff } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface GalleryManagerProps {
  items: GalleryItem[]
}

export function GalleryManager({ items }: GalleryManagerProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get("title") as string,
      image_url: formData.get("image_url") as string,
      description: formData.get("description") as string,
      is_visible: true,
      display_order: items.length,
    }

    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.from("gallery").insert([data])

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Gallery item added successfully",
      })
      e.currentTarget.reset()
      router.refresh()
    }

    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this item?")) return

    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.from("gallery").delete().eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Item deleted successfully",
      })
      router.refresh()
    }
  }

  async function toggleVisibility(id: string, currentVisibility: boolean) {
    const supabase = getSupabaseBrowserClient()
    const { error } = await supabase.from("gallery").update({ is_visible: !currentVisibility }).eq("id", id)

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility",
        variant: "destructive",
      })
    } else {
      router.refresh()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Gallery Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL *</Label>
              <Input id="image_url" name="image_url" type="url" required placeholder="https://example.com/image.jpg" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" rows={2} />
            </div>

            <Button type="submit" disabled={loading}>
              <Plus className="w-4 h-4 mr-2" />
              {loading ? "Adding..." : "Add to Gallery"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id} className={!item.is_visible ? "opacity-50" : ""}>
            <div className="relative aspect-square">
              <Image
                src={item.image_url || "/placeholder.svg"}
                alt={item.title || "Gallery image"}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardContent className="p-4 space-y-2">
              {item.title && <h3 className="font-medium line-clamp-1">{item.title}</h3>}
              {item.description && <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => toggleVisibility(item.id, item.is_visible)}>
                  {item.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
