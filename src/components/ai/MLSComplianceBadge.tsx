import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MLSComplianceBadge() {
  return (
    <Card className="p-4 !bg-[hsl(176,81%,46%)] !border-[hsl(176,81%,36%)]">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white/90">
              MLS Compliant
            </Badge>
            <span className="text-sm font-medium">Portland, OR Market</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">
                    All images are processed with MLS compliance requirements automatically applied.
                    Virtual staging disclosure is included in all processed images.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-xs text-muted-foreground">
            <strong>Required Disclosure:</strong> "Photos are virtually staged to help buyers visualize the potential of the space"
          </p>
          <p className="text-xs text-muted-foreground">
            All staging preserves architectural integrity and complies with Portland MLS policies.
          </p>
        </div>
      </div>
    </Card>
  );
}

