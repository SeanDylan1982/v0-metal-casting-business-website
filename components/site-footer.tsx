import Link from "next/link"
import { Mail, Phone } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg">Frafiks Melting & Casting</h3>
            <p className="text-sm text-muted-foreground">Crafting excellence in solid metal products since 2010.</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-muted-foreground hover:text-foreground">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=potjie-pots" className="text-muted-foreground hover:text-foreground">
                  Potjie Pots
                </Link>
              </li>
              <li>
                <Link href="/products?category=religious-art" className="text-muted-foreground hover:text-foreground">
                  Religious Art
                </Link>
              </li>
              <li>
                <Link href="/products?category=jewelry" className="text-muted-foreground hover:text-foreground">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link href="/products?category=custom-orders" className="text-muted-foreground hover:text-foreground">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <a href="tel:0727183114" className="hover:text-foreground">
                  072 718 3114
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <a href="mailto:francismagoro@gmail.com" className="hover:text-foreground">
                  francismagoro@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Frafiks Melting and Casting Pty Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
