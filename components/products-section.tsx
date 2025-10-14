import Image from "next/image"
import Link from "next/link"
import type { Product, Category } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductsSectionProps {
  products: Product[]
  categories: Category[]
}

export function ProductsSection({ products, categories }: ProductsSectionProps) {
  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Our Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our range of handcrafted metal products, from traditional potjie pots to custom jewelry and
            decorative pieces.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Featured Products */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative aspect-square bg-muted">
                  {product.image_url ? (
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                  )}
                  {product.is_featured && <Badge className="absolute top-3 right-3 bg-amber-600">Featured</Badge>}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                {product.category && (
                  <Badge variant="secondary" className="mt-3">
                    {product.category.name}
                  </Badge>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/products/${product.slug}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
