"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (key: string, value: string) => {
    router.push(`/jobs?${createQueryString(key, value)}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Location</h3>
        <Input 
          placeholder="e.g. New York, Remote" 
          defaultValue={searchParams.get("location") || ""}
          onBlur={(e) => handleFilterChange("location", e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-semibold mb-3">Job Type</h3>
        <div className="space-y-2">
          {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={`type-${type}`} 
                checked={searchParams.get("type") === type}
                onCheckedChange={(checked) => handleFilterChange("type", checked ? type : "")}
              />
              <Label htmlFor={`type-${type}`}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Experience Level</h3>
        <div className="space-y-2">
          {["Fresher", "Mid-Level", "Senior", "Executive"].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox 
                id={`exp-${level}`}
                checked={searchParams.get("experience") === level}
                onCheckedChange={(checked) => handleFilterChange("experience", checked ? level : "")}
              />
              <Label htmlFor={`exp-${level}`}>{level}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Work Mode</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="mode-remote"
              checked={searchParams.get("remote") === "true"}
              onCheckedChange={(checked) => handleFilterChange("remote", checked ? "true" : "")}
            />
            <Label htmlFor="mode-remote">Remote Only</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
