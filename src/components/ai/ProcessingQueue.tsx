import { Check, X, Loader2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { EditingJob } from "@/hooks/useAIProcessor";
import { useMemo } from "react";

interface ProcessingQueueProps {
  jobs: EditingJob[];
}

export function ProcessingQueue({ jobs }: ProcessingQueueProps) {
  if (jobs.length === 0) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-success" />;
      case "failed":
        return <X className="h-4 w-4 text-destructive" />;
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin bg-gradient-to-r from-[hsl(280,70%,70%)] via-[hsl(265,65%,55%)] to-[hsl(290,75%,65%)] bg-clip-text text-transparent" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      completed: "default",
      processing: "secondary",
      failed: "destructive",
      pending: "secondary",
    };
    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  // Memoize counts to avoid recalculating on every render
  const completedCount = useMemo(() => 
    jobs.filter((j) => j.status === "completed").length,
    [jobs]
  );
  
  const failedCount = useMemo(() => 
    jobs.filter((j) => j.status === "failed").length,
    [jobs]
  );

  return (
    <Card className="p-6 !bg-[hsl(176,81%,46%)] !border-[hsl(176,81%,36%)]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Processing Queue</h3>
          <div className="flex gap-2">
            <span className="text-sm text-muted-foreground">
              {completedCount}/{jobs.length} completed
            </span>
            {failedCount > 0 && (
              <span className="text-sm text-destructive">{failedCount} failed</span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-lg bg-accent/5 border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(job.status)}
                  <span className="text-sm font-medium truncate max-w-[200px]">
                    {job.fileName}
                  </span>
                </div>
                {getStatusBadge(job.status)}
              </div>

              {job.status === "processing" && (
                <Progress value={job.progress} className="h-2" />
              )}

              {job.status === "failed" && job.error && (
                <p className="text-xs text-destructive mt-2">{job.error}</p>
              )}

              {job.status === "completed" && job.processingTime && (
                <p className="text-xs text-muted-foreground mt-2">
                  Processed in {(job.processingTime / 1000).toFixed(1)}s
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
