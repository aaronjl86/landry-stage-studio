import { useState, useCallback, useEffect, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface UploadedImage {
  id: string;
  name: string;
  data: string;
  objectUrl: string;
  size: number;
}

interface EnhancedPhotoUploadProps {
  onImagesUploaded: (images: { data: string; name: string }[]) => void;
  maxImages?: number;
}

export function EnhancedPhotoUpload({
  onImagesUploaded,
  maxImages = 10,
}: EnhancedPhotoUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  // Initialize Web Worker on mount
  useEffect(() => {
    const worker = new Worker(
      new URL('../../workers/imageCompression.worker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;
    
    return () => {
      worker.terminate();
    };
  }, []);

  const compressImage = async (file: File): Promise<{ data: string; size: number }> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error('Worker not initialized'));
        return;
      }

      const worker = workerRef.current;
      
      const handleMessage = (e: MessageEvent) => {
        if (e.data.success) {
          resolve({ data: e.data.data, size: e.data.size });
        } else {
          reject(new Error(e.data.error));
        }
        worker.removeEventListener('message', handleMessage);
      };
      
      worker.addEventListener('message', handleMessage);
      
      worker.postMessage({
        file,
        options: {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/webp",
        }
      });
    });
  };

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      if (images.length + files.length > maxImages) {
        toast({
          title: "Too Many Images",
          description: `Maximum ${maxImages} images allowed`,
          variant: "destructive",
        });
        return;
      }

      setIsCompressing(true);

      try {
        const newImages: UploadedImage[] = [];

        for (const file of files) {
          if (!file.type.startsWith("image/")) continue;

          const { data: compressedData, size } = await compressImage(file);
          const objectUrl = URL.createObjectURL(file);

          newImages.push({
            id: crypto.randomUUID(),
            name: file.name,
            data: compressedData,
            objectUrl,
            size,
          });
        }

        setImages((prev) => [...prev, ...newImages]);
        onImagesUploaded(newImages);

        toast({
          title: "Images Uploaded",
          description: `${newImages.length} image(s) compressed and ready`,
        });
      } catch (error: unknown) {
        toast({
          title: "Upload Failed",
          description:
            typeof error === "object" && error !== null && "message" in error
              ? String((error as { message?: unknown }).message)
              : String(error),
          variant: "destructive",
        });
      } finally {
        setIsCompressing(false);
      }
    },
    [images.length, maxImages, onImagesUploaded]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.objectUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  return (
    <Card className="p-6 card-professional">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Upload Photos</h3>
          <span className="text-sm text-muted-foreground">
            {images.length}/{maxImages}
          </span>
        </div>

        <label
          htmlFor="photo-upload"
          className={`
            flex flex-col items-center justify-center w-full h-48 border-2 
            border-dashed rounded-lg cursor-pointer transition-all
            ${
              isCompressing
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/20 hover:border-primary hover:bg-accent/5"
            }
          `}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isCompressing ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
                <p className="text-sm text-muted-foreground">Compressing images...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-foreground">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WebP up to 10MB each
                </p>
              </>
            )}
          </div>
          <input
            id="photo-upload"
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/webp"
            multiple
            onChange={handleFileChange}
            disabled={isCompressing || images.length >= maxImages}
          />
        </label>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {images.map((img) => (
              <div key={img.id} className="relative group">
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={img.objectUrl}
                    alt={img.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(img.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {img.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(img.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
