"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [envError, setEnvError] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setEnvError(false)

    try {
      const supabase = getSupabaseBrowserClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        router.push("/admin")
        router.refresh()
      }
    } catch (error) {
      console.error("[v0] Login error:", error)
      setEnvError(true)
      toast({
        title: "Configuration Error",
        description: "Please complete the setup process first.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
          <CardDescription>Sign in to manage your website content</CardDescription>
        </CardHeader>
        <CardContent>
          {envError && (
            <Alert className="mb-4 border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Environment variables are not configured.{" "}
                <Link href="/setup" className="underline font-medium">
                  Complete setup
                </Link>{" "}
                to continue.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/setup" className="text-primary underline">
              View setup guide
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
