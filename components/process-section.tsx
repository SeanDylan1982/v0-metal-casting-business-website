import Image from "next/image"

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Design & Mold Creation",
      description: "We work with you to design your piece and create custom sand molds or reusable metal molds.",
      image: "/images/process-molding.jpg",
    },
    {
      number: "02",
      title: "Metal Smelting",
      description: "Our furnace heats metal to precise temperatures, ensuring optimal flow and quality.",
      image: "/images/process-smelting.jpg",
    },
    {
      number: "03",
      title: "Casting & Finishing",
      description: "Molten metal is poured into molds, cooled, and finished to perfection.",
      image: "/images/process-finishing.jpg",
    },
  ]

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Our Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to completion, we ensure every step meets our high standards of quality.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-bold text-amber-600/20 font-serif">{step.number}</div>
                <h3 className="font-serif text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
