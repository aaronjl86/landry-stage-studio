import { supabase } from "@/integrations/supabase/client";

export const TEMPLATE_PROMPTS = {
  "lighting-enhancement":
    "Enhance ONLY the lighting and brightness. ABSOLUTELY FORBIDDEN: changing walls, floors, ceiling, windows, doors, or any structural elements. CRITICAL: Windows must remain 100% visible and unobstructed - no covering or blocking windows. Balance exposure, brighten dark areas, create even natural lighting. Preserve 100% of the room's architecture and structure.",
  decluttering:
    "Remove ALL furniture, decor, personal items, and movable objects to create a completely empty room. ABSOLUTELY FORBIDDEN: changing walls, floors, ceiling, windows, doors, moldings, built-ins, fixtures, or any permanent architectural features. CRITICAL: Windows must remain 100% visible and unchanged - never covered, altered, or obscured. The room structure, dimensions, windows, doors, and all architectural elements must remain EXACTLY as they are. Result must be a clean empty space with perfect architectural preservation and all windows fully visible.",
  "virtual-staging":
    "Add ONLY furniture and decor to this room. ABSOLUTELY FORBIDDEN: adding, removing, or moving walls, floors, ceiling, windows, doors, or any structural elements. CRITICAL: Windows must remain 100% visible and unobstructed - NEVER place furniture or curtains that cover or block windows. The architecture must remain 100% unchanged. Add only movable furniture (sofas, tables, chairs, beds, lamps) and decorative items (art, plants, accessories) positioned away from windows.",
  "sky-replacement":
    "Replace ONLY the sky in this exterior photo with a beautiful clear blue sky with white clouds. ABSOLUTELY FORBIDDEN: changing the building structure, windows, doors, roofline, or landscaping. CRITICAL: All windows must remain exactly as they are - no alterations, covering, or modifications to window structures. Maintain realistic lighting and preserve all architectural elements exactly as they are.",
  "day-to-dusk":
    "Transform ONLY the lighting to twilight/golden hour. ABSOLUTELY FORBIDDEN: changing building structure, windows, doors, landscaping, or any architectural features. CRITICAL: Windows must remain exactly as they are in the original photo - no covering, blocking, or alterations. Add warm interior lighting glow from windows and create twilight sky. All structural elements must remain exactly as photographed.",
  "lawn-enhancement":
    "Enhance ONLY landscaping and grass. ABSOLUTELY FORBIDDEN: changing the building, hardscaping, driveways, walkways, or any structural elements including windows. CRITICAL: Windows must remain 100% visible and unchanged. Make grass lush and green, trim overgrown areas. All architecture, pathways, structures, and windows must remain exactly as they are.",
  "hdr-enhancement":
    "Apply professional HDR processing to enhance dynamic range, detail, colors, and exposure. ABSOLUTELY FORBIDDEN: changing room structure, walls, floors, ceiling, windows, doors, or any architectural elements. CRITICAL: Windows must remain 100% visible, unobstructed, and unchanged. This is photo quality enhancement only - preserve 100% of the architectural structure with all windows fully visible.",
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
