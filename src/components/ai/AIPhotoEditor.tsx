import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Sparkles, Loader2 } from "lucide-react";
import { EnhancedPhotoUpload } from "./EnhancedPhotoUpload";
import { EnhancedTemplateSelector } from "./EnhancedTemplateSelector";
import { ProcessingQueue } from "./ProcessingQueue";
import { BeforeAfterComparison } from "./BeforeAfterComparison";
import { UpgradeDialog } from "./UpgradeDialog";
import { useAIProcessor } from "@/hooks/useAIProcessor";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export function AIPhotoEditor() {
  const [uploadedImages, setUploadedImages] = useState<
    { data: string; name: string }[]
  >([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [requiredCredits, setRequiredCredits] = useState(0);
  
  const { jobs, isProcessing, submitBatchEdit, clearJobs, redoJob } = useAIProcessor();
  const { credits, freeTrialCredits, refreshCredits, isAdmin } = useAuth();

  // Memoize credit check computation
  const canProcess = useMemo(() => {
    const totalCredits = freeTrialCredits + credits;
    return isAdmin || totalCredits >= uploadedImages.length;
  }, [isAdmin, freeTrialCredits, credits, uploadedImages.length]);

  // Memoize job filtering for display
  const completedJobs = useMemo(() => {
    return jobs.filter(job => job.status === 'completed');
  }, [jobs]);

  const pendingJobs = useMemo(() => {
    return jobs.filter(job => job.status === 'pending' || job.status === 'processing');
  }, [jobs]);

  const handleProcess = useCallback(async () => {
    if (uploadedImages.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    if (!customPrompt) {
      toast({
        title: "No Instructions Provided",
        description: "Please add editing instructions",
        variant: "destructive",
      });
      return;
    }

    // Admins bypass credit checks
    const totalCredits = freeTrialCredits + credits;
    if (!isAdmin && totalCredits < uploadedImages.length) {
      console.log("Insufficient credits - showing upgrade dialog");
      setRequiredCredits(uploadedImages.length);
      setShowUpgradeDialog(true);
      return;
    }

    await submitBatchEdit(uploadedImages, [], customPrompt, false);
    await refreshCredits();
  }, [uploadedImages, customPrompt, isAdmin, credits, submitBatchEdit, refreshCredits]);

  const handleUpgradeDialogClose = useCallback(() => {
    console.log("Upgrade dialog closed - resetting editor state");
    // Reset all form state so user can start fresh without stuck button
    setUploadedImages([]);
    setCustomPrompt("");
    // Note: Credits only refresh after actual subscription purchase or monthly renewal
  }, []);

  const handleClearAll = useCallback(() => {
    clearJobs();
    setUploadedImages([]);
    setCustomPrompt("");
  }, [clearJobs]);


  return (
    <div className="container mx-auto py-8 pb-32 space-y-6 relative">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Professional Photo Enhancement
        </h1>
        <p className="text-muted-foreground">
          Transform your real estate photos with professional staging enhancements
        </p>
      </div>

      <Card className="p-6 !bg-[hsl(176,81%,46%)] !border-[hsl(176,81%,36%)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Credit Balance</h3>
            {isAdmin ? (
              <p className="text-sm text-muted-foreground">Unlimited credits (Admin)</p>
            ) : (
              <div className="space-y-1">
                {freeTrialCredits > 0 && (
                  <p className="text-sm text-muted-foreground">
                    🎉 Free trial: {freeTrialCredits} uploads remaining
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Paid credits: {credits}
                </p>
                <p className="text-xs text-muted-foreground">
                  Total: {freeTrialCredits + credits} uploads available
                </p>
              </div>
            )}
          </div>
          {isAdmin && (
            <div className="bg-gradient-to-r from-[hsl(280,70%,70%)] to-[hsl(290,75%,65%)] text-white px-4 py-2 rounded-full text-sm font-semibold">
              👑 Admin
            </div>
          )}
        </div>
      </Card>

      <EnhancedPhotoUpload
        onImagesUploaded={(images) => setUploadedImages((prev) => [...prev, ...images])}
      />

      <EnhancedTemplateSelector
        customPrompt={customPrompt}
        onCustomPromptChange={setCustomPrompt}
      />

      <div className="flex justify-center gap-4">
        <Button
          size="lg"
          onClick={handleProcess}
          disabled={isProcessing || uploadedImages.length === 0}
          className="gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Process {uploadedImages.length} Photo{uploadedImages.length !== 1 ? "s" : ""}
            </>
          )}
        </Button>

      {(uploadedImages.length > 0 || jobs.length > 0) && (
        <Button
          variant="outline"
          size="lg"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      )}
      </div>

      {jobs.length > 0 && (
        <>
      <ProcessingQueue jobs={jobs} />
      <BeforeAfterComparison jobs={jobs} onRedoJob={redoJob} />
        </>
      )}

      <UpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        requiredCredits={requiredCredits}
        currentCredits={credits}
        onClose={handleUpgradeDialogClose}
      />

    </div>
  );
}
