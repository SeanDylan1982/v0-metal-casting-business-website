"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Copy } from "lucide-react"
import Link from "next/link"

export default function SetupPage() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-2">Setup Guide</h1>
          <p className="text-muted-foreground">Configure your Frafiks Melting & Casting website</p>
        </div>

        {hasEnvVars ? (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-900">Environment Variables Configured</AlertTitle>
            <AlertDescription className="text-green-800">
              Your Supabase connection is set up correctly. You can now proceed to{" "}
              <Link href="/login" className="underline font-medium">
                login
              </Link>{" "}
              or view the{" "}
              <Link href="/" className="underline font-medium">
                homepage
              </Link>
              .
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-900">Action Required</AlertTitle>
            <AlertDescription className="text-amber-800">
              Please add the environment variables below to your Vercel project to enable database functionality.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Step 1: Add Environment Variables</CardTitle>
              <CardDescription>Add these environment variables to your Vercel project settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Go to your Vercel project:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Click on the project settings (gear icon in the sidebar)</li>
                  <li>Navigate to "Environment Variables"</li>
                  <li>Add the following variables:</li>
                </ol>
              </div>

              <div className="space-y-4 mt-4">
                {Object.entries(envVars).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-mono font-medium">{key}</label>
                      <button
                        onClick={() => navigator.clipboard.writeText(value)}
                        className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    </div>
                    <div className="bg-muted p-3 rounded-md font-mono text-xs break-all">{value}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 2: Run Database Scripts</CardTitle>
              <CardDescription>Execute these SQL scripts in your Supabase SQL Editor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm mb-2">
                  Go to your{" "}
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Supabase SQL Editor
                  </a>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                  <li>
                    Copy the contents of <code className="bg-muted px-1 rounded">scripts/001_create_tables.sql</code>
                  </li>
                  <li>Paste and run it in the SQL Editor</li>
                  <li>
                    Then copy and run <code className="bg-muted px-1 rounded">scripts/002_seed_data.sql</code>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 3: Create Admin User</CardTitle>
              <CardDescription>Set up your admin account in Supabase Authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm mb-2">
                  Go to your{" "}
                  <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Supabase Authentication
                  </a>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground ml-2">
                  <li>Click "Add User" → "Create new user"</li>
                  <li>
                    Email: <code className="bg-muted px-1 rounded">francismagoro@gmail.com</code>
                  </li>
                  <li>Set a secure password</li>
                  <li>Enable "Auto Confirm User"</li>
                  <li>Click "Create user"</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Step 4: Access Your Website</CardTitle>
              <CardDescription>Once setup is complete, you can access these pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/" className="block p-3 rounded-md border hover:bg-muted transition-colors">
                  <div className="font-medium">Homepage</div>
                  <div className="text-sm text-muted-foreground">View your public website</div>
                </Link>
                <Link href="/login" className="block p-3 rounded-md border hover:bg-muted transition-colors">
                  <div className="font-medium">Admin Login</div>
                  <div className="text-sm text-muted-foreground">Access the admin dashboard</div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
