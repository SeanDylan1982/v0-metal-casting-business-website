"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Flame } from "lucide-react"
import { loginAdmin } from "@/app/actions/auth"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const result = await loginAdmin(username, password)

      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to admin dashboard.",
        })
        router.push("/admin")
        router.refresh()
      } else {
        setError(result.error || "Login failed")
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("[v0] Login error:", err)
      setError("An unexpected error occurred")
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-4">
      <Card className="w-full max-w-md border-amber-900/20 bg-stone-900/80 backdrop-blur">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-amber-500/10">
              <Flame className="h-8 w-8 text-amber-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-serif text-amber-50">Admin Login</CardTitle>
          <CardDescription className="text-stone-400">
            Sign in to manage Frafiks Melting & Casting
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-900/50 bg-red-950/50">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-stone-300">Username</Label>
              <Input 
                id="username" 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                placeholder="Enter your username"
                className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-stone-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-500"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white" 
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-500">
            Frafiks Melting & Casting (Pty) Ltd
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
