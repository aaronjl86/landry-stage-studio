import { useState } from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RealEstateTemplates } from "@/lib/aiAPI";

interface Template {
  id: string;
  name: string;
  description: string;
  category: "lighting" | "cleanup" | "staging" | "enhancement";
}

const TEMPLATES: Template[] = [
  {
    id: RealEstateTemplates.LIGHTING_ENHANCEMENT,
    name: "Lighting Enhancement",
    description: "Balance exposure and brighten spaces",
    category: "lighting",
  },
  {
    id: RealEstateTemplates.DECLUTTERING,
    name: "Smart Declutter",
    description: "Remove personal items and clutter",
    category: "cleanup",
  },
  {
    id: RealEstateTemplates.VIRTUAL_STAGING,
    name: "Virtual Staging",
    description: "Add furniture to empty rooms",
    category: "staging",
  },
  {
    id: RealEstateTemplates.SKY_REPLACEMENT,
    name: "Sky Replacement",
    description: "Beautiful blue skies",
    category: "enhancement",
  },
  {
    id: RealEstateTemplates.DAY_TO_DUSK,
    name: "Day to Dusk",
    description: "Transform to twilight shot",
    category: "enhancement",
  },
  {
    id: RealEstateTemplates.LAWN_ENHANCEMENT,
    name: "Lawn Enhancement",
    description: "Lush, maintained landscaping",
    category: "enhancement",
  },
  {
    id: RealEstateTemplates.HDR_ENHANCEMENT,
    name: "HDR Pro",
    description: "Professional HDR processing",
    category: "enhancement",
  },
];

interface EnhancedTemplateSelectorProps {
  selectedTemplates: string[];
  onSelectionChange: (templates: string[]) => void;
  customPrompt: string;
  onCustomPromptChange: (prompt: string) => void;
}

export function EnhancedTemplateSelector({
  selectedTemplates,
  onSelectionChange,
  customPrompt,
  onCustomPromptChange,
}: EnhancedTemplateSelectorProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const toggleTemplate = (templateId: string) => {
    if (selectedTemplates.includes(templateId)) {
      onSelectionChange(selectedTemplates.filter((id) => id !== templateId));
    } else {
      onSelectionChange([...selectedTemplates, templateId]);
    }
  };

  const filteredTemplates = filter
    ? TEMPLATES.filter((t) => t.category === filter)
    : TEMPLATES;

  const categories = [
    { id: "lighting", label: "Lighting" },
    { id: "cleanup", label: "Cleanup" },
    { id: "staging", label: "Staging" },
    { id: "enhancement", label: "Enhancement" },
  ];

  return (
    <Card className="p-6 bg-[hsl(176,81%,56%)] border-[hsl(176,81%,46%)]">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Enhancement Templates</h3>
          <p className="text-sm text-muted-foreground">
            Select one or more templates to apply
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={filter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter(null)}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={filter === cat.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTemplates.map((template) => {
            const isSelected = selectedTemplates.includes(template.id);
            return (
              <div
                key={template.id}
                onClick={() => toggleTemplate(template.id)}
                className={`
                  relative p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <h4 className="font-medium mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Custom Instructions (Optional)</label>
          <Textarea
            placeholder="Add specific instructions for AI processing..."
            value={customPrompt}
            onChange={(e) => onCustomPromptChange(e.target.value)}
            rows={3}
            className="resize-none"
          />
        </div>
      </div>
    </Card>
  );
}
