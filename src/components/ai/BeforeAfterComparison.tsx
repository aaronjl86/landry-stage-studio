import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EditingJob } from "@/hooks/useAIProcessor";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface BeforeAfterComparisonProps {
  jobs: EditingJob[];
  onRedoJob?: (jobId: string) => void;
}

export function BeforeAfterComparison({ jobs, onRedoJob }: BeforeAfterComparisonProps) {
  const completedJobs = jobs.filter((j) => j.status === "completed" && j.editedImage);

  if (completedJobs.length === 0) return null;

  const downloadImage = (dataUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `edited_${fileName}`;
    link.click();
  };

  const downloadAllAsZip = async () => {
    const zip = new JSZip();

    for (const job of completedJobs) {
      if (job.editedImage) {
        const base64Data = job.editedImage.split(",")[1];
        zip.file(`edited_${job.fileName}`, base64Data, { base64: true });
      }
    }

    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "edited_photos.zip");
  };

  return (
    <Card className="p-6 card-professional">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Results</h3>
          <Button
            onClick={downloadAllAsZip}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download All ({completedJobs.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {completedJobs.map((job) => (
            <div key={job.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium truncate">{job.fileName}</h4>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRedoJob?.(job.id)}
                    title="Re-render with same settings"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => downloadImage(job.editedImage!, job.fileName)}
                    title="Download image"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Before</p>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={job.originalImage}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">After</p>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={job.editedImage}
                      alt="Edited"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
