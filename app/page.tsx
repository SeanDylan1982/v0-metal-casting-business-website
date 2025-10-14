import type { Product, Category, GalleryItem } from "@/lib/supabase/types"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProductsSection } from "@/components/products-section"
import { ProcessSection } from "@/components/process-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { LiveChat } from "@/components/live-chat"
import { getFeaturedProducts } from "@/app/actions/products"
import { getCategories } from "@/app/actions/categories"
import { getVisibleGalleryItems } from "@/app/actions/gallery"
import GoogleAnalytics from "@/components/GoogleAnalytics.tsx";

export default async function HomePage() {
  const [featuredProducts, categories, galleryItems] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
    getVisibleGalleryItems(),
  ])

  return (
    <main className="min-h-screen">
      <GoogleAnalytics />
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
