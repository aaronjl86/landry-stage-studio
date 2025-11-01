import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface EnhancedTemplateSelectorProps {
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
}

export function EnhancedTemplateSelector({
  customPrompt,
  onCustomPromptChange,
}: EnhancedTemplateSelectorProps) {
  return (
    <Card className="p-6 !bg-[hsl(176,81%,46%)] !border-[hsl(176,81%,36%)]">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Editing Instructions</h3>
          <p className="text-sm text-muted-foreground">
            Describe what you want the AI to do with your photos
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Instructions</label>
          <Textarea
            placeholder="Example: Add modern furniture to this empty living room, or Brighten the lighting and enhance colors..."
            value={customPrompt}
            onChange={(e) => onCustomPromptChange(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            All edits preserve the room's original structure (walls, windows, doors, floors)
          </p>
        </div>
      </div>
    </Card>
  );
}
