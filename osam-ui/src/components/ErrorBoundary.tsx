/**
 * Error Boundary Component
 * Catches and displays errors globally with retry capability
 */

import React, { Component, ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorCount: 0
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorCount: 0
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 0l0 0M7.08 6.47l1.41 1.41M17.51 17.51l1.41 1.41M5 12a7 7 0 1114 0 7 7 0 01-14 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 text-center mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>

            {/* Error Details */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6 max-h-40 overflow-auto">
                <p className="text-xs font-mono text-gray-600 whitespace-pre-wrap">
                  {this.state.error?.stack}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReload}
                className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Reload Page
              </button>
              <a
                href="/"
                className="block w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-medium text-center"
              >
                Back to Home
              </a>
            </div>

            {/* Support Info */}
            <p className="text-xs text-gray-500 text-center mt-6">
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
