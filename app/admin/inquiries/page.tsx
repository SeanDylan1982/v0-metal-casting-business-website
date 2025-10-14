import { getSupabaseServerClient } from "@/lib/supabase/server"
import { InquiriesTable } from "@/components/admin/inquiries-table"
import GoogleAnalytics from "@/components/GoogleAnalytics"

export default async function InquiriesPage() {
  const supabase = await getSupabaseServerClient()

  const { data: inquiries } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-2">Inquiries</h1>
        <p className="text-muted-foreground">View and manage customer inquiries</p>
      </div>

      <GoogleAnalytics />
      <InquiriesTable inquiries={inquiries || []} />
    </div>
  )
}
