import { useState, useCallback } from "react";
import { aiAPI, EditImageRequest } from "@/lib/aiAPI";
import { toast } from "@/hooks/use-toast";

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

  return {
    jobs,
    isProcessing,
    submitBatchEdit,
    clearJobs,
    removeJob,
  };
}
