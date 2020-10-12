import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  console.groupCollapsed(error.message);
  console.info(info);
  console.groupEnd();
};

const ErrorFallback: React.FC = () => (
  <div id="error" role="alert">
    <div className="error-robot" />
  </div>
);

export const ErrorBoundary: React.FC = ({ children }) => (
  <ReactErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={myErrorHandler}
  >
    {children}
  </ReactErrorBoundary>
);
