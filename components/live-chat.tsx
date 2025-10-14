"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)

  const whatsappNumber = "27727183114" // Format: country code + number without leading 0
  const whatsappMessage = encodeURIComponent("Hello! I would like to inquire about your metal casting services.")

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-green-700"
            onClick={() => setIsOpen(true)}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="sr-only">Open chat</span>
          </Button>
        )}
      </div>

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-80 shadow-2xl">
          <CardHeader className="bg-green-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Chat with Us</CardTitle>
                <CardDescription className="text-green-100">We're here to help!</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-green-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Have questions about our products or services? Start a conversation with us on WhatsApp!
            </p>

            <div className="space-y-2">
              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  window.location.href = "tel:0727183114"
                }}
              >
                Call: 072 718 3114
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Available Mon-Fri: 8AM-5PM
              <br />
              Saturday: 9AM-2PM
            </p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
