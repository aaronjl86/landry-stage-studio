import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info, Zap, Brain } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ModelSelectorProps {
  value: "original" | "pro";
  onValueChange: (value: "original" | "pro") => void;
}

export function ModelSelector({ value, onValueChange }: ModelSelectorProps) {
  return (
    <Card className="p-6 !bg-[hsl(176,81%,46%)] !border-[hsl(176,81%,36%)]">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">AI Model Selection</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">
                  Choose between Original (fast, cost-effective) or Pro (higher quality with reasoning engine)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <RadioGroup value={value} onValueChange={onValueChange}>
          <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="original" id="original" className="mt-1" />
            <div className="flex-1 space-y-1">
              <Label htmlFor="original" className="flex items-center gap-2 cursor-pointer">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="font-semibold">Original</span>
                <span className="text-xs text-muted-foreground">(Gemini 2.5 Flash)</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                Fast and cost-effective. Best for quick iterations and standard staging tasks.
                Processing time: ~5 seconds per image.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors">
            <RadioGroupItem value="pro" id="pro" className="mt-1" />
            <div className="flex-1 space-y-1">
              <Label htmlFor="pro" className="flex items-center gap-2 cursor-pointer">
                <Brain className="h-4 w-4 text-purple-500" />
                <span className="font-semibold">Pro</span>
                <span className="text-xs text-muted-foreground">(Gemini 3 Pro)</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                Higher quality with reasoning engine. Better text rendering, spatial accuracy, and complex layouts.
                Processing time: ~15-40 seconds per image. Includes thinking phase for logical planning.
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
    </Card>
  );
}

