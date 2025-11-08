import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";

interface ViolationReportButtonProps {
  originalImageUrl: string;
  editedImageUrl: string;
  prompt: string;
  jobId: string;
}

/**
 * Phase 3: User Violation Reporting Component
 * 
 * Allows users to flag AI-generated images that contain unwanted
 * architectural changes. Reports are logged to the database for
 * analysis and model retraining.
 */
export function ViolationReportButton({ 
  originalImageUrl, 
  editedImageUrl, 
  prompt,
  jobId 
}: ViolationReportButtonProps) {
  const [isReporting, setIsReporting] = useState(false);
  const [hasReported, setHasReported] = useState(false);

  const handleReport = async () => {
    if (hasReported) {
      toast.info("You've already reported this image");
      return;
    }

    setIsReporting(true);
    try {
      // Truncate base64 data for storage (store only metadata)
      const originalTruncated = originalImageUrl.substring(0, 100) + "...";
      const editedTruncated = editedImageUrl.substring(0, 100) + "...";

      const { error } = await supabase.from("architectural_violations").insert({
        original_image_url: originalTruncated,
        edited_image_url: editedTruncated,
        user_prompt: prompt,
        reported_by_user: true,
        violation_reason: "User-reported structural change"
      });
      
      if (error) throw error;
      
      setHasReported(true);
      toast.success("Thank you for reporting. We'll review this result to improve our AI.");
    } catch (error: any) {
      console.error("Failed to report violation:", error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsReporting(false);
    }
  };
  
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleReport}
      disabled={isReporting || hasReported}
      className="text-muted-foreground hover:text-destructive transition-colors"
      title="Report if this image changed the room's structure (walls, windows, doors)"
    >
      <AlertTriangle className="h-4 w-4 mr-2" />
      {hasReported ? "Reported" : "Report Structural Change"}
    </Button>
  );
}
