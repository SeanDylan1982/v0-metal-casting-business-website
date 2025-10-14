import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Product, Category, GalleryItem } from "@/lib/supabase/types"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProductsSection } from "@/components/products-section"
import { ProcessSection } from "@/components/process-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { LiveChat } from "@/components/live-chat"

export default async function HomePage() {
  const supabase = await getSupabaseServerClient()

  // Fetch featured products
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*, category:categories(*)")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6)

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("*").order("display_order", { ascending: true })

  // Fetch gallery items
  const { data: galleryItems } = await supabase
    .from("gallery")
    .select("*")
    .eq("is_visible", true)
    .order("display_order", { ascending: true })
    .limit(8)

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ProductsSection products={(featuredProducts as Product[]) || []} categories={(categories as Category[]) || []} />
      <ProcessSection />
      <GallerySection items={(galleryItems as GalleryItem[]) || []} />
      <ContactSection />
      <LiveChat />
    </main>
  )
}
