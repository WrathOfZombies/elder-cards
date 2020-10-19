import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const onError = (error: Error, info: { componentStack: string }) => {
  // TODO: Hook into telemetry here
  console.groupCollapsed(error.message);
  console.info(info);
  console.groupEnd();
};

const ErrorFallback: React.FC = () => (
  <div id="error" role="alert" aria-label="Something went wrong">
    <div className="error-robot" />
  </div>
);

/**
 * Renders an error boundary. We use native elements as this is
 * above the Fluent provider tree
 */
export const ErrorBoundary: React.FC = ({ children }) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
    {children}
  </ReactErrorBoundary>
);
