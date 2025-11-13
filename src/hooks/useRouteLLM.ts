import { useState, useCallback } from "react";
import { routeLLM, RouteLLMMessage } from "@/lib/routeLLM";

export interface UseRouteLLMOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export function useRouteLLM(options: UseRouteLLMOptions = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<string>("");

  const {
    model = "openai/gpt-oss-120b",
    temperature,
    maxTokens,
  } = options;

  /**
   * Send a non-streaming chat completion request
   */
  const sendMessage = useCallback(
    async (messages: RouteLLMMessage[]): Promise<string> => {
      setIsLoading(true);
      setError(null);
      setResponse("");

      try {
        const result = await routeLLM.chatCompletion({
          model,
          messages,
          temperature,
          max_tokens: maxTokens,
        });

        const content =
          result.choices[0]?.message?.content || "No response generated";
        setResponse(content);
        return content;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [model, temperature, maxTokens]
  );

  /**
   * Send a streaming chat completion request
   */
  const sendMessageStream = useCallback(
    async (
      messages: RouteLLMMessage[],
      onChunk?: (content: string) => void
    ): Promise<string> => {
      setIsLoading(true);
      setError(null);
      setResponse("");

      return new Promise((resolve, reject) => {
        let fullContent = "";

        routeLLM
          .chatCompletionStream(
            {
              model,
              messages,
              temperature,
              max_tokens: maxTokens,
            },
            (chunk) => {
              fullContent += chunk;
              setResponse(fullContent);
              if (onChunk) {
                onChunk(chunk);
              }
            },
            (completeContent) => {
              setIsLoading(false);
              resolve(completeContent);
            },
            (err) => {
              setIsLoading(false);
              setError(err);
              reject(err);
            }
          )
          .catch((err) => {
            setIsLoading(false);
            setError(err);
            reject(err);
          });
      });
    },
    [model, temperature, maxTokens]
  );

  const clear = useCallback(() => {
    setResponse("");
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    sendMessage,
    sendMessageStream,
    isLoading,
    error,
    response,
    clear,
  };
}

