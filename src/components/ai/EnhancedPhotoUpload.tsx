import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { Upload, X } from "lucide-react";
import imageCompression from "browser-image-compression";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface UploadedImage {
  id: string;
  name: string;
  data: string;
  objectUrl: string;
  size: number;
  prompt: string;
}

interface EnhancedPhotoUploadProps {
  onImagesUploaded: (images: { data: string; name: string; prompt: string }[]) => void;
  maxImages?: number;
}

export function EnhancedPhotoUpload({
  onImagesUploaded,
  maxImages = 10,
}: EnhancedPhotoUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const isIOS = useMemo(() => {
    const ua = navigator.userAgent || "";
    const iOSDevice = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && (navigator as any).maxTouchPoints > 1);
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);
    return iOSDevice && isSafari;
  }, []);

  // Initialize Web Worker on mount (skip on iOS Safari)
  useEffect(() => {
    if (isIOS || typeof Worker === 'undefined') {
      workerRef.current = null;
      return;
    }
    const worker = new Worker(
      new URL('../../workers/imageCompression.worker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;
    
    return () => {
      worker.terminate();
    };
  }, [isIOS]);

  const compressImage = async (file: File): Promise<{ data: string; size: number }> => {
    const compressOnMainThread = async (): Promise<{ data: string; size: number }> => {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: false,
        fileType: "image/webp",
      });
      const data: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read compressed file'));
        reader.readAsDataURL(compressedFile);
      });
      return { data, size: compressedFile.size };
    };

    if (!workerRef.current) {
      return compressOnMainThread();
    }

    return new Promise((resolve, reject) => {
      const worker = workerRef.current as Worker;

      const handleMessage = (e: MessageEvent) => {
        worker.removeEventListener('message', handleMessage);
        if (e.data.success) {
          resolve({ data: e.data.data, size: e.data.size });
        } else {
          const msg = String(e.data.error || '');
          // Fallback for iOS Safari where Image is unavailable in workers
          if (msg.toLowerCase().includes('image')) {
            compressOnMainThread().then(resolve).catch(reject);
          } else {
            reject(new Error(msg));
          }
        }
      };

      worker.addEventListener('message', handleMessage);

      worker.postMessage({
        file,
        options: {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: false,
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
            prompt: "",
          });
        }

        const updatedImages = [...images, ...newImages];
        setImages(updatedImages);
        onImagesUploaded(updatedImages.map(img => ({ data: img.data, name: img.name, prompt: img.prompt })));

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
    [images, maxImages, onImagesUploaded]
  );

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.objectUrl);
      const updated = prev.filter((i) => i.id !== id);
      // Notify parent of updated images list
      onImagesUploaded(updated.map(img => ({ data: img.data, name: img.name, prompt: img.prompt })));
      return updated;
    });
  }, [onImagesUploaded]);

  const updateImagePrompt = useCallback((id: string, prompt: string) => {
    setImages((prev) => {
      const updated = prev.map((img) =>
        img.id === id ? { ...img, prompt } : img
      );
      // Notify parent of all current images with updated prompts
      const imagesForParent = updated.map(img => ({ data: img.data, name: img.name, prompt: img.prompt }));
      onImagesUploaded(imagesForParent);
      return updated;
    });
  }, [onImagesUploaded]);

  return (
    <Card className="p-6 !bg-[hsl(176,81%,46%)] !border-[hsl(176,81%,36%)]">
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
          <div className="space-y-4 mt-4">
            {images.map((img) => (
              <Card key={img.id} className="p-4 space-y-3">
                <div className="relative group">
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
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate">
                      {img.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(img.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor={`prompt-${img.id}`} className="text-xs">
                      Staging Instructions for this image
                    </Label>
                    <Textarea
                      id={`prompt-${img.id}`}
                      placeholder="Example: Add modern sectional sofa, mid-century-modern artwork on the walls, and decor to the room with a cohesive style of coffee table and 3 throw pillows in various shades of gray on the sofa."
                      value={img.prompt}
                      onChange={(e) => updateImagePrompt(img.id, e.target.value)}
                      rows={3}
                      className="resize-none text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Describe how you want this specific image staged
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
