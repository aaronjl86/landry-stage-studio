import { supabase } from "@/integrations/supabase/client";

export const TEMPLATE_PROMPTS = {
  "lighting-enhancement":
    "Enhance ONLY the lighting and brightness. DO NOT change walls, floors, ceiling, windows, doors, or room structure. Balance the exposure, brighten dark areas, and create even, natural lighting throughout. Preserve the exact room architecture.",
  decluttering:
    "Remove ALL furniture, decor, personal items, and movable objects to create a completely empty room. DO NOT change walls, floors, ceiling, windows, doors, moldings, fixtures, or any permanent architectural features. Preserve the exact room structure, lighting, and architectural details. Result should be a clean, empty space ready for staging.",
  "virtual-staging":
    "Add ONLY furniture and decor to this room. DO NOT change walls, floors, ceiling, windows, doors, or any room structure. Preserve the exact architecture. Add tasteful modern furniture like sofas, tables, lamps, and wall art that complement the existing space.",
  "sky-replacement":
    "Replace ONLY the sky in this exterior photo with a beautiful clear blue sky with white clouds. DO NOT change the building, landscaping, or any other elements. Maintain realistic lighting and colors.",
  "day-to-dusk":
    "Transform ONLY the lighting to twilight. DO NOT change the building structure, landscaping, or architectural features. Add warm interior lighting glowing from windows and create a golden hour sky. Preserve all structural elements.",
  "lawn-enhancement":
    "Enhance ONLY the landscaping and grass. DO NOT change the building, hardscaping, or structural elements. Make the grass look lush and green, trim overgrown areas. Keep all architecture exactly as is.",
  "hdr-enhancement":
    "Apply professional HDR processing to enhance dynamic range and detail. DO NOT change the room structure, walls, floors, ceiling, windows, or doors. Only improve the photo quality, colors, and exposure.",
};

// Template ID to prompt key mapping
const TEMPLATE_ID_MAP: Record<string, keyof typeof TEMPLATE_PROMPTS> = {
  "lighting-enhancement-v2": "lighting-enhancement",
  "smart-declutter-v3": "decluttering",
  "virtual-staging-v4": "virtual-staging",
  "sky-replace-pro-v2": "sky-replacement",
  "day-to-dusk-v3": "day-to-dusk",
  "landscaping-enhance-v2": "lawn-enhancement",
  "hdr-pro-v3": "hdr-enhancement",
};

export enum RealEstateTemplates {
  LIGHTING_ENHANCEMENT = "lighting-enhancement-v2",
  DECLUTTERING = "smart-declutter-v3",
  SKY_REPLACEMENT = "sky-replace-pro-v2",
  VIRTUAL_STAGING = "virtual-staging-v4",
  DAY_TO_DUSK = "day-to-dusk-v3",
  LAWN_ENHANCEMENT = "landscaping-enhance-v2",
  WINDOW_VIEWS = "window-view-enhance-v2",
  HDR_ENHANCEMENT = "hdr-pro-v3",
}

export interface EditImageRequest {
  prompt: string;
  imageData: string;
  mimeType: string;
}

export interface EditImageResponse {
  success: boolean;
  editedImageData?: string;
  remaining?: number;
  error?: string;
}

export interface GenerateImageRequest {
  prompt: string;
}

export interface GenerateImageResponse {
  success: boolean;
  imageData?: string;
  remaining?: number;
  error?: string;
}

export class AIProcessorAPI {
  private baseUrl: string;
  private maxRetries = 3;
  private timeout = 60000;

  constructor() {
    this.baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
  }

  private async retryWithBackoff<T>(
    fn: () => Promise<T>,
    retries = this.maxRetries
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        const delay = Math.pow(2, this.maxRetries - retries) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.retryWithBackoff(fn, retries - 1);
      }
      throw error;
    }
  }

  async submitEdit(request: EditImageRequest): Promise<EditImageResponse> {
    return this.retryWithBackoff(async () => {
      const { data, error } = await supabase.functions.invoke("edit-photo", {
        body: request,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as EditImageResponse;
    });
  }

  async generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
    return this.retryWithBackoff(async () => {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: request,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data as GenerateImageResponse;
    });
  }

  async getCreditBalance(): Promise<{
    quota: number;
    used: number;
    remaining: number;
    plan_code: string;
  }> {
    const { data, error } = await supabase.functions.invoke("get-credit-balance");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  combinePrompts(templateIds: string[], customPrompt?: string): string {
    const templatePrompts = templateIds
      .map((id) => {
        const promptKey = TEMPLATE_ID_MAP[id];
        return promptKey ? TEMPLATE_PROMPTS[promptKey] : null;
      })
      .filter(Boolean);

    const allPrompts = customPrompt
      ? [...templatePrompts, customPrompt]
      : templatePrompts;

    return allPrompts.join(" ");
  }
}

export const aiAPI = new AIProcessorAPI();
