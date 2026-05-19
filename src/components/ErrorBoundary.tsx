import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4">
          <div className="interactive-card max-w-lg rounded-2xl border border-[var(--border-soft)] bg-[var(--surface)] p-8 text-center space-y-4">
            <p className="font-serif-accent text-3xl italic text-[var(--accent)]">
              csy20.works
            </p>
            <h1 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
              Something went wrong
            </h1>
            <p className="text-base leading-7 text-[var(--text-secondary)]">
              The page hit an unexpected error. Try refreshing, or come back in
              a bit.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="button-shell inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold button-clay"
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
