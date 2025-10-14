import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-amber-900">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-background.jpg)"; height: '100vh'; }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white text-balance">
            Frafiks Melting & Casting
          </h1>

          <p className="text-xl md:text-2xl text-amber-100 text-balance">Crafting Excellence in Solid Metal Products</p>

          <p className="text-lg text-zinc-300 max-w-2xl mx-auto text-pretty">
            From traditional potjie pots to custom jewelry and decorative art pieces, we bring your metal casting
            visions to life with precision and craftsmanship.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white" asChild>
              <Link href="#products">
                View Our Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <Link href="#contact">Request a Quote</Link>
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-amber-400">15+</div>
              <div className="text-sm text-zinc-300">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-amber-400">1000+</div>
              <div className="text-sm text-zinc-300">Products Crafted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-amber-400">100%</div>
              <div className="text-sm text-zinc-300">Custom Capability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
