export function log(
  level: "info" | "warn" | "error" | "debug",
  message: string,
  metadata?: Record<string, any>
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...metadata,
  };
  console.log(JSON.stringify(logEntry));
}

export const logger = {
  info: (message: string, metadata?: Record<string, any>) => log("info", message, metadata),
  warn: (message: string, metadata?: Record<string, any>) => log("warn", message, metadata),
  error: (message: string, metadata?: Record<string, any>) => log("error", message, metadata),
  debug: (message: string, metadata?: Record<string, any>) => log("debug", message, metadata),
};
