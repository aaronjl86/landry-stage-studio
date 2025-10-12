import { supabase } from "@/integrations/supabase/client";

export const TEMPLATE_PROMPTS = {
  "lighting-enhancement":
    "Enhance ONLY the lighting and brightness. ABSOLUTELY FORBIDDEN: changing walls, floors, ceiling, windows, doors, or any structural elements. Windows must remain structurally unchanged (window treatments like curtains/blinds allowed if kept open/decorative). Balance exposure, brighten dark areas, create even natural lighting. Preserve 100% of the room's architecture and structure.",
  decluttering:
    "SMART CLUTTER PRIMARY DIRECTIVE: Remove movable objects only. Preserve ALL architectural elements exactly as photographed. REMOVE ONLY: Furniture (sofas, chairs, tables, beds, dressers, shelving units), Personal items (decorations, photos, books, electronics, plants), Movable objects and accessories. PRESERVE EXACTLY - NO MODIFICATIONS: Windows (position, size, number, frames, glass), Walls (structure, color, texture, position), Doors (location, style, hardware), Floors (material, pattern, condition), Ceilings (height, finish, features), Moldings and trim, Built-in shelving/cabinets, Light fixtures and electrical, Room dimensions and proportions, All permanent architectural features. RESULT: Empty room with 100% architectural fidelity to original photograph.",
  "virtual-staging":
    "CRITICAL CONSTRAINT: This is FURNITURE STAGING ONLY - ZERO architectural changes allowed. You MUST preserve the EXACT room structure as photographed. ABSOLUTELY FORBIDDEN - DO NOT: add windows, remove windows, move windows, change window sizes, add walls, remove walls, move walls, change ceiling, modify floor structure, add doors, remove doors, change moldings, alter built-in features, modify room dimensions, add alcoves, remove alcoves, change wall angles, add architectural details. WINDOWS MUST REMAIN EXACTLY AS PHOTOGRAPHED - same size, same position, same structure, same number. Only window treatments (curtains, drapes, blinds) are allowed if kept minimal and tasteful. ADD ONLY: movable furniture items (sofas, chairs, tables, beds, dressers, nightstands, coffee tables, side tables, lamps, floor lamps), decorative accessories (artwork on walls, throw pillows, blankets, plants in pots, vases, books, decorative objects on surfaces). Place furniture naturally in the room WITHOUT blocking windows or doorways. All furniture must appear realistically placed on the existing floor. The room's architecture, structure, walls, windows, doors, and dimensions MUST remain photographically identical to the original image.",
  "sky-replacement":
    "Replace ONLY the sky in this exterior photo with a beautiful clear blue sky with white clouds. ABSOLUTELY FORBIDDEN: changing the building structure, windows, doors, roofline, or landscaping. All windows must remain exactly as they are - no structural alterations to window frames, glass, or positions. Maintain realistic lighting and preserve all architectural elements exactly as they are.",
  "day-to-dusk":
    "Transform ONLY the lighting to twilight/golden hour. ABSOLUTELY FORBIDDEN: changing building structure, windows, doors, landscaping, or any architectural features. Windows must remain structurally unchanged in their original positions. Add warm interior lighting glow from windows and create twilight sky. All structural elements must remain exactly as photographed.",
  "lawn-enhancement":
    "Enhance ONLY landscaping and grass. ABSOLUTELY FORBIDDEN: changing the building, hardscaping, driveways, walkways, or any structural elements including windows. Windows must remain structurally unchanged. Make grass lush and green, trim overgrown areas. All architecture, pathways, structures, and windows must remain exactly as they are.",
  "hdr-enhancement":
    "Apply professional HDR processing to enhance dynamic range, detail, colors, and exposure. ABSOLUTELY FORBIDDEN: changing room structure, walls, floors, ceiling, windows, doors, or any architectural elements. Windows must remain structurally unchanged (window treatments allowed). This is photo quality enhancement only - preserve 100% of the architectural structure.",
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
