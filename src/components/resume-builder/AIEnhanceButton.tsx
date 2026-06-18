"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, X, Loader2 } from "lucide-react";
import { enhanceWithAI } from "@/actions/ai";
import { Textarea } from "@/components/ui/textarea";

interface AIEnhanceButtonProps {
  currentText: string;
  type: "experience" | "summary" | "skills" | "achievements";
  onAccept: (newText: string) => void;
}

export default function AIEnhanceButton({ currentText, type, onAccept }: AIEnhanceButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEnhance = () => {
    if (!currentText || currentText.trim().length === 0) return;
    setError(null);
    setSuggestion(null);

    startTransition(() => {
      enhanceWithAI(currentText, type).then((res) => {
        if (res.success && res.text) {
          setSuggestion(res.text);
        } else if (res.error) {
          setError(res.error);
        }
      });
    });
  };

  if (suggestion) {
    return (
      <div className="mt-2 p-4 bg-primary/5 border border-primary/20 rounded-md space-y-3">
        <div className="flex items-center gap-2 text-primary font-medium text-sm mb-1">
          <Sparkles className="w-4 h-4" /> AI Suggestion
        </div>
        <Textarea 
          value={suggestion} 
          onChange={(e) => setSuggestion(e.target.value)}
          className="text-sm bg-white"
          rows={4}
        />
        <div className="flex gap-2">
          <Button size="sm" onClick={() => { onAccept(suggestion); setSuggestion(null); }} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Check className="w-4 h-4 mr-1" /> Accept
          </Button>
          <Button size="sm" variant="outline" onClick={() => setSuggestion(null)}>
            <X className="w-4 h-4 mr-1" /> Discard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button 
        type="button"
        variant="secondary" 
        size="sm" 
        onClick={handleEnhance} 
        disabled={isPending || currentText.length < 5}
        className="text-xs font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
      >
        {isPending ? (
          <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
        ) : (
          <Sparkles className="w-3 h-3 mr-1.5" />
        )}
        {isPending ? "Enhancing..." : "Enhance with AI"}
      </Button>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}
