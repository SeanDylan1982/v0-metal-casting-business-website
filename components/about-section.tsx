import { Flame, Hammer, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">About Frafiks Melting & Casting</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Based in South Africa, we specialize in crafting solid metal products using custom molds and our
            state-of-the-art smelting furnace. What started with traditional potjie pots has evolved into a diverse
            range of metal casting services for both retail customers and wholesale businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-4 p-6 rounded-lg bg-card border">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Flame className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Expert Smelting</h3>
            <p className="text-muted-foreground text-sm">
              Our advanced furnace technology ensures precise temperature control for perfect metal casting every time.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card border">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Hammer className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Custom Molds</h3>
            <p className="text-muted-foreground text-sm">
              We create bespoke molds for any design, from traditional patterns to your unique specifications.
            </p>
          </div>

          <div className="text-center space-y-4 p-6 rounded-lg bg-card border">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Award className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl font-semibold">Quality Craftsmanship</h3>
            <p className="text-muted-foreground text-sm">
              Every piece is crafted with attention to detail, ensuring durability and aesthetic excellence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
