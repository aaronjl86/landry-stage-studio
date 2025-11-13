/**
 * RouteLLM API Service
 * Provides TypeScript interface for RouteLLM chat completions API
 * Supports both streaming and non-streaming responses
 */

export interface RouteLLMMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface RouteLLMRequest {
  model: string;
  messages: RouteLLMMessage[];
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

export interface RouteLLMResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message?: {
      role: string;
      content: string;
    };
    delta?: {
      role?: string;
      content?: string;
    };
    finish_reason: string | null;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface RouteLLMStreamChunk {
  choices: Array<{
    delta?: {
      role?: string;
      content?: string;
    };
    finish_reason?: string | null;
  }>;
}

export class RouteLLMService {
  private baseUrl = "https://routellm.abacus.ai/v1/chat/completions";
  private apiKey: string;

  constructor() {
    const apiKey = import.meta.env.VITE_ROUTELLM_API_KEY;
    if (!apiKey) {
      throw new Error("VITE_ROUTELLM_API_KEY environment variable is not set");
    }
    this.apiKey = apiKey;
  }

  /**
   * Make a non-streaming chat completion request
   */
  async chatCompletion(
    request: RouteLLMRequest
  ): Promise<RouteLLMResponse> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...request,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `RouteLLM API error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return await response.json();
  }

  /**
   * Make a streaming chat completion request
   * @param request The chat completion request
   * @param onChunk Callback function called for each chunk of the stream
   * @param onComplete Optional callback called when stream completes
   * @param onError Optional callback called if an error occurs
   */
  async chatCompletionStream(
    request: RouteLLMRequest,
    onChunk: (content: string) => void,
    onComplete?: (fullContent: string) => void,
    onError?: (error: Error) => void
  ): Promise<void> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...request,
          stream: true,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `RouteLLM API error: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.trim() === "") continue;

          if (line.startsWith("data: ")) {
            const data = line.slice(6); // Remove "data: " prefix

            if (data === "[DONE]") {
              if (onComplete) {
                onComplete(fullContent);
              }
              return;
            }

            try {
              const parsed: RouteLLMStreamChunk = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;

              if (content) {
                fullContent += content;
                onChunk(content);
              }

              // Check if stream is complete
              if (parsed.choices?.[0]?.finish_reason) {
                if (onComplete) {
                  onComplete(fullContent);
                }
                return;
              }
            } catch (parseError) {
              console.warn("Failed to parse stream chunk:", parseError, data);
            }
          }
        }
      }

      if (onComplete) {
        onComplete(fullContent);
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      if (onError) {
        onError(err);
      } else {
        throw err;
      }
    }
  }
}

// Export a singleton instance
export const routeLLM = (() => {
  const apiKey = import.meta.env.VITE_ROUTELLM_API_KEY;
  if (!apiKey) {
    // In production with Cloudflare, the API key should always be set
    // This null check is primarily for local development
    return null;
  }
  return new RouteLLMService();
})();

