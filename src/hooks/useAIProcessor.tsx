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
  isRedo?: boolean;
  isPublic?: boolean;
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
          is_public: job.isPublic || false,
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
      } catch (error: unknown) {
        updateJob(job.id, {
          status: "failed",
          error: error instanceof Error ? error.message : "Unknown error occurred",
          progress: 0,
        });

        toast({
          title: "Processing Failed",
          description: error instanceof Error ? error.message : "Unknown error occurred",
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
      customPrompt?: string,
      isPublic?: boolean
    ) => {
      const newJobs: EditingJob[] = images.map((img) => ({
        id: crypto.randomUUID(),
        originalImage: img.data,
        fileName: img.name,
        status: "pending" as JobStatus,
        progress: 0,
        templateIds,
        customPrompt,
        isPublic,
      }));

      setJobs((prev) => [...prev, ...newJobs]);
      setIsProcessing(true);

      // Process in chunks to avoid blocking main thread
      const processChunk = async (startIdx: number): Promise<void> => {
        const CHUNK_SIZE = 3; // Process 3 images at a time
        const endIdx = Math.min(startIdx + CHUNK_SIZE, newJobs.length);
        
        // Process this chunk
        const chunkPromises = newJobs
          .slice(startIdx, endIdx)
          .map((job) => processJob(job));
        
        await Promise.all(chunkPromises);
        
        // If more images remain, schedule next chunk
        if (endIdx < newJobs.length) {
          // Use requestIdleCallback if available, otherwise setTimeout
          if ('requestIdleCallback' in window) {
            await new Promise<void>((resolve) => {
              requestIdleCallback(() => {
                processChunk(endIdx).then(resolve);
              }, { timeout: 100 }); // Fallback after 100ms
            });
          } else {
            await new Promise<void>((resolve) => {
              setTimeout(() => {
                processChunk(endIdx).then(resolve);
              }, 0);
            });
          }
        } else {
          setIsProcessing(false);
        }
      };

      try {
        await processChunk(0);
      } catch (error) {
        setIsProcessing(false);
        throw error;
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
