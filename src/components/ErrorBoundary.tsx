import React from "react";

interface Props { children: React.ReactNode }
interface State { hasError: boolean; message?: string }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown): State {
    return { hasError: true, message: error instanceof Error ? error.message : "Unexpected error" };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    // Log for diagnostics – visible in browser console and Cloud logs if captured
    console.error("App runtime error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background text-foreground">
          <div className="max-w-md text-center space-y-3">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">
              {this.state.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-md px-4 py-2 bg-primary text-primary-foreground shadow"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
