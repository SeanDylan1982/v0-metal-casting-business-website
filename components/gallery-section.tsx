import Image from "next/image"
import type { GalleryItem } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface GallerySectionProps {
  items: GalleryItem[]
}

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See our craftsmanship in action and explore our finished products.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-lg overflow-hidden bg-muted group cursor-pointer"
            >
              <Image
                src={item.image_url || "/placeholder.svg"}
                alt={item.title || "Gallery image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.title && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-medium text-sm">{item.title}</p>
                </div>
              )}
            </div>
          ))}

          {/* Placeholder slots */}
          {[...Array(Math.max(0, 8 - items.length))].map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="relative aspect-square rounded-lg overflow-hidden bg-muted border-2 border-dashed border-muted-foreground/20 flex items-center justify-center"
            >
              <p className="text-muted-foreground text-sm">Coming Soon</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
