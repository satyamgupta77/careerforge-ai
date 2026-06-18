"use client";

import { useState, useTransition } from "react";
import { submitCompanyVerification } from "@/actions/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function CompanyVerificationPage() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    officialEmail: "",
    website: "",
    linkedinProfile: "",
    gstNumber: "",
  });

  // MVP Mock for UI. In production, fetch current VerificationStatus from the Company model.
  const verificationStatus: string = "PENDING"; // "PENDING", "VERIFIED", "REJECTED", "UNSUBMITTED"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      submitCompanyVerification(formData).then((res) => {
        if (res.error) alert(res.error);
        else alert(res.message);
      });
    });
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trust & Verification</h1>
        <p className="text-muted-foreground mt-1">Submit your documents to become a verified employer.</p>
      </div>

      <div className="modern-card p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-border pb-4 mb-4">
          <h2 className="text-xl font-bold">Verification Status</h2>
          {verificationStatus === "VERIFIED" && <Badge className="bg-emerald-100 text-emerald-800"><ShieldCheck className="w-4 h-4 mr-1"/> Verified</Badge>}
          {verificationStatus === "PENDING" && <Badge variant="secondary" className="bg-amber-100 text-amber-800"><ShieldAlert className="w-4 h-4 mr-1"/> Under Review</Badge>}
          {verificationStatus === "REJECTED" && <Badge variant="destructive">Verification Rejected</Badge>}
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          To ensure a safe environment for candidates, we manually verify all companies. <strong className="text-foreground">Only verified companies can publish jobs publicly.</strong> If you are unverified, your jobs will remain as drafts.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Official Email Domain</Label>
            <Input 
              value={formData.officialEmail} 
              onChange={e => setFormData({...formData, officialEmail: e.target.value})}
              placeholder="e.g. hr@yourcompany.com" 
              required 
              disabled={verificationStatus === "PENDING" || verificationStatus === "VERIFIED"}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Company Website</Label>
            <Input 
              value={formData.website} 
              onChange={e => setFormData({...formData, website: e.target.value})}
              placeholder="https://yourcompany.com" 
              required 
              disabled={verificationStatus === "PENDING" || verificationStatus === "VERIFIED"}
            />
          </div>

          <div className="space-y-2">
            <Label>LinkedIn Company Profile</Label>
            <Input 
              value={formData.linkedinProfile} 
              onChange={e => setFormData({...formData, linkedinProfile: e.target.value})}
              placeholder="https://linkedin.com/company/..." 
              required 
              disabled={verificationStatus === "PENDING" || verificationStatus === "VERIFIED"}
            />
          </div>

          <div className="space-y-2">
            <Label>GST Number (Optional, for Indian entities)</Label>
            <Input 
              value={formData.gstNumber} 
              onChange={e => setFormData({...formData, gstNumber: e.target.value})}
              placeholder="e.g. 22AAAAA0000A1Z5" 
              disabled={verificationStatus === "PENDING" || verificationStatus === "VERIFIED"}
            />
          </div>

          {(verificationStatus !== "PENDING" && verificationStatus !== "VERIFIED") && (
            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit for Verification"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
