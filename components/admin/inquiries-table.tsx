"use client"

import { useState } from "react"
import type { Inquiry } from "@/lib/supabase/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface InquiriesTableProps {
  inquiries: Inquiry[]
}

export function InquiriesTable({ inquiries }: InquiriesTableProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const router = useRouter()

  async function updateStatus(id: string, status: Inquiry["status"]) {
    const supabase = getSupabaseBrowserClient()
    await supabase.from("inquiries").update({ status }).eq("id", id)
    router.refresh()
  }

  function handleView(inquiry: Inquiry) {
    setSelectedInquiry(inquiry)
    if (inquiry.status === "new") {
      updateStatus(inquiry.id, "read")
    }
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No inquiries yet
                </TableCell>
              </TableRow>
            ) : (
              inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.email}</TableCell>
                  <TableCell>
                    <Badge variant={inquiry.inquiry_type === "wholesale" ? "default" : "secondary"}>
                      {inquiry.inquiry_type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        inquiry.status === "new" ? "default" : inquiry.status === "read" ? "secondary" : "outline"
                      }
                    >
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(inquiry.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleView(inquiry)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              {selectedInquiry && new Date(selectedInquiry.created_at).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p>{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedInquiry.email}</p>
                </div>
                {selectedInquiry.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{selectedInquiry.phone}</p>
                  </div>
                )}
                {selectedInquiry.company && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                    <p>{selectedInquiry.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Type</p>
                  <Badge variant={selectedInquiry.inquiry_type === "wholesale" ? "default" : "secondary"}>
                    {selectedInquiry.inquiry_type}
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                <p className="text-sm bg-muted p-4 rounded-lg">{selectedInquiry.message}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => updateStatus(selectedInquiry.id, "responded")}
                  disabled={selectedInquiry.status === "responded"}
                >
                  Mark as Responded
                </Button>
                <Button variant="outline" asChild>
                  <a href={`mailto:${selectedInquiry.email}`}>Reply via Email</a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
