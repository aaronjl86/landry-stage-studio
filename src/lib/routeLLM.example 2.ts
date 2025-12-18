/**
 * RouteLLM API Usage Examples
 * 
 * This file demonstrates how to use the RouteLLM service for chat completions.
 * Make sure to set VITE_ROUTELLM_API_KEY in your .env file.
 */

import { routeLLM, RouteLLMMessage } from "./routeLLM";

// Example 1: Non-streaming chat completion
async function exampleNonStreaming() {
  if (!routeLLM) {
    console.error("RouteLLM service is not available. Check your API key.");
    return;
  }

  const messages: RouteLLMMessage[] = [
    {
      role: "user",
      content: "What is the meaning of life?",
    },
  ];

  try {
    const response = await routeLLM.chatCompletion({
      model: "openai/gpt-oss-120b",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log("Response:", response.choices[0]?.message?.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 2: Streaming chat completion
async function exampleStreaming() {
  if (!routeLLM) {
    console.error("RouteLLM service is not available. Check your API key.");
    return;
  }

  const messages: RouteLLMMessage[] = [
    {
      role: "user",
      content: "Write a short story about a robot learning to paint.",
    },
  ];

  try {
    await routeLLM.chatCompletionStream(
      {
        model: "openai/gpt-oss-120b",
        messages,
        temperature: 0.8,
      },
      (chunk) => {
        // Called for each chunk of content
        process.stdout.write(chunk);
      },
      (fullContent) => {
        // Called when stream completes
        console.log("\n\nStream complete!");
        console.log("Full content length:", fullContent.length);
      },
      (error) => {
        // Called if an error occurs
        console.error("Stream error:", error);
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

// Example 3: Using in a React component with the hook
/*
import { useRouteLLM } from "@/hooks/useRouteLLM";

function ChatComponent() {
  const { sendMessage, sendMessageStream, isLoading, response, error } = useRouteLLM({
    model: "openai/gpt-oss-120b",
    temperature: 0.7,
  });

  const handleSend = async () => {
    const messages: RouteLLMMessage[] = [
      { role: "user", content: "Hello!" },
    ];
    
    // Non-streaming
    await sendMessage(messages);
    
    // Or streaming
    await sendMessageStream(messages, (chunk) => {
      console.log("Received chunk:", chunk);
    });
  };

  return (
    <div>
      <button onClick={handleSend} disabled={isLoading}>
        Send Message
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {response && <p>{response}</p>}
    </div>
  );
}
*/

