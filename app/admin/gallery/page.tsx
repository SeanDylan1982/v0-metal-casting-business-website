import { getSupabaseServerClient } from "@/lib/supabase/server"
import { GalleryManager } from "@/components/admin/gallery-manager"
import GoogleAnalytics from "../GoogleAnalytics"

export default async function GalleryPage() {
  const supabase = await getSupabaseServerClient()

  const { data: galleryItems } = await supabase.from("gallery").select("*").order("display_order", { ascending: true })

  return (
    <GoogleAnalytics />
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Gallery</h1>
        <p className="text-muted-foreground">Manage your gallery images and videos</p>
      </div>

      <GalleryManager items={galleryItems || []} />
    </div>
  )
}
