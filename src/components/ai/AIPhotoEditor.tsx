import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [makePublic, setMakePublic] = useState(false);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [requiredCredits, setRequiredCredits] = useState(0);
  
  const { jobs, isProcessing, submitBatchEdit, clearJobs, redoJob } = useAIProcessor();
  const { credits, refreshCredits, isAdmin } = useAuth();

  const handleProcess = async () => {
    if (uploadedImages.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    if (selectedTemplates.length === 0 && !customPrompt) {
      toast({
        title: "No Templates Selected",
        description: "Please select at least one template or add custom instructions",
        variant: "destructive",
      });
      return;
    }

    if (credits < uploadedImages.length) {
      console.log("Insufficient credits - showing upgrade dialog");
      setRequiredCredits(uploadedImages.length);
      setShowUpgradeDialog(true);
      return;
    }

    await submitBatchEdit(uploadedImages, selectedTemplates, customPrompt, makePublic);
    await refreshCredits();
  };

  const handleUpgradeDialogClose = () => {
    console.log("Upgrade dialog closed - resetting editor state");
    // Reset all form state so user can start fresh without stuck button
    setUploadedImages([]);
    setSelectedTemplates([]);
    setCustomPrompt("");
    setMakePublic(false);
    // Note: Credits only refresh after actual subscription purchase or monthly renewal
  };


  return (
    <div className="container mx-auto py-8 pb-32 space-y-6 relative">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          AI Photo Virtual Staging
        </h1>
        <p className="text-muted-foreground">
          Transform your real estate photos with AI-powered enhancements
        </p>
      </div>

      <Card className="p-6 card-professional">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Credit Balance</h3>
            <p className="text-sm text-muted-foreground">
              You have {credits} credits remaining
            </p>
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
        selectedTemplates={selectedTemplates}
        onSelectionChange={setSelectedTemplates}
        customPrompt={customPrompt}
        onCustomPromptChange={setCustomPrompt}
      />

      <Card className="p-4 bg-muted/50">
        <div className="flex items-start gap-3">
          <Checkbox 
            id="make-public"
            checked={makePublic}
            onCheckedChange={(checked) => setMakePublic(checked === true)}
          />
          <div className="space-y-1">
            <Label htmlFor="make-public" className="text-sm font-medium cursor-pointer">
              Share in Public Gallery
            </Label>
            <p className="text-xs text-muted-foreground">
              Allow others to see your staged photos in the public showcase gallery
            </p>
          </div>
        </div>
      </Card>

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

        {jobs.length > 0 && (
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              clearJobs();
              setUploadedImages([]);
              setSelectedTemplates([]);
              setCustomPrompt("");
            }}
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
