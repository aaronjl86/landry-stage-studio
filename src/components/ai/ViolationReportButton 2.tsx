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
 * Structural Change Reporting Component (NO REFUND LOGIC)
 * 
 * Logs MLS-unsafe AI outputs for QA purposes only.
 * Does NOT affect billing - revisions are already unlimited and free.
 * User re-processes via existing unlimited revision system.
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
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("You must be logged in to report structural changes");
        return;
      }

      // Truncate base64 data for storage (store only metadata)
      const originalTruncated = originalImageUrl.substring(0, 100) + "...";
      const editedTruncated = editedImageUrl.substring(0, 100) + "...";

      // Insert report into new image_reports table (pure logging, no refund)
      const { error } = await supabase.from("image_reports").insert({
        user_id: user.id,
        job_id: jobId,
        original_image_url: originalTruncated,
        edited_image_url: editedTruncated,
        user_prompt: prompt,
        report_type: "STRUCTURAL_CHANGE"
      });
      
      if (error) throw error;
      
      setHasReported(true);
      toast.success("Structural change reported. You may now re-process this image for free.");
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
