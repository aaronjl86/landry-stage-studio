import { useState, useCallback } from "react";
import { aiAPI, EditImageRequest } from "@/lib/aiAPI";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export type JobStatus = "pending" | "processing" | "completed" | "failed";

export interface EditingJob {
  id: string;
  originalImage: string;
  editedImage?: string;
  status: JobStatus;
  progress: number;
  error?: string;
  templateIds: string[];
  customPrompt?: string;
  processingTime?: number;
  fileName: string;
  isRedo?: boolean; // Flag to track if this is a redo/regeneration
}

export function useAIProcessor() {
  const [jobs, setJobs] = useState<EditingJob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const updateJob = useCallback(
    (jobId: string, updates: Partial<EditingJob>) => {
      setJobs((prev) =>
        prev.map((job) => (job.id === jobId ? { ...job, ...updates } : job))
      );
    },
    []
  );

  const processJob = useCallback(
    async (job: EditingJob) => {
      const startTime = Date.now();
      updateJob(job.id, { status: "processing", progress: 0 });

      try {
        const prompt = aiAPI.combinePrompts(job.templateIds, job.customPrompt);

        updateJob(job.id, { progress: 30 });

        const request: EditImageRequest = {
          prompt,
          imageData: job.originalImage,
          mimeType: "image/png",
        };

        const result = await aiAPI.submitEdit(request);

        if (result.success && result.editedImageData) {
          const processingTime = Date.now() - startTime;
          updateJob(job.id, {
            status: "completed",
            editedImage: result.editedImageData,
            progress: 100,
            processingTime,
          });

          // Save to database ONLY if this is not a redo/regeneration
          // Redos should not charge credits or create duplicate records
          if (!job.isRedo) {
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (user) {
                await supabase.from("uploads").insert({
                  user_id: user.id,
                  original_image_url: job.originalImage,
                  staged_image_url: result.editedImageData,
                  status: "completed",
                  credits_used: 1,
                });
              }
            } catch (dbError) {
              console.error("Error saving to database:", dbError);
              // Don't fail the job if database save fails
            }
          }

          toast({
            title: "Success",
            description: `${job.fileName} processed in ${(processingTime / 1000).toFixed(1)}s`,
          });
        } else {
          throw new Error(result.error || "Processing failed");
        }
      } catch (error: any) {
        updateJob(job.id, {
          status: "failed",
          error: error.message,
          progress: 0,
        });

        toast({
          title: "Processing Failed",
          description: error.message,
          variant: "destructive",
        });
      }
    },
    [updateJob]
  );

  const submitBatchEdit = useCallback(
    async (
      images: { data: string; name: string }[],
      templateIds: string[],
      customPrompt?: string
    ) => {
      const newJobs: EditingJob[] = images.map((img) => ({
        id: crypto.randomUUID(),
        originalImage: img.data,
        fileName: img.name,
        status: "pending" as JobStatus,
        progress: 0,
        templateIds,
        customPrompt,
      }));

      setJobs((prev) => [...prev, ...newJobs]);
      setIsProcessing(true);

      try {
        // Process with controlled concurrency (5 at a time)
        const concurrency = 5;
        for (let i = 0; i < newJobs.length; i += concurrency) {
          const batch = newJobs.slice(i, i + concurrency);
          await Promise.all(batch.map((job) => processJob(job)));
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [processJob]
  );

  const clearJobs = useCallback(() => {
    setJobs([]);
  }, []);

  const removeJob = useCallback((jobId: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  }, []);

  const redoJob = useCallback(
    async (jobId: string) => {
      const job = jobs.find((j) => j.id === jobId);
      if (!job) return;

      // Reset the job status and mark as redo (won't charge credits)
      updateJob(jobId, {
        status: "pending",
        progress: 0,
        editedImage: undefined,
        error: undefined,
        processingTime: undefined,
        isRedo: true, // Mark as redo so it doesn't charge credits
      });

      await processJob(job);
    },
    [jobs, updateJob, processJob]
  );

  return {
    jobs,
    isProcessing,
    submitBatchEdit,
    clearJobs,
    removeJob,
    redoJob,
  };
}
