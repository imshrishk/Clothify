import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static getDerivedStateFromError(error) {
    return { error };
  }

  getErrorMessage(error) {
    if (error?.message?.includes('Network Error')) {
      return "Unable to connect to the server. Please check your internet connection.";
    }
    return "Something went wrong. We're working on fixing it.";
  }

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    const isDevelopment = import.meta.env.MODE === 'development';

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full space-y-6 text-center">
          <h1 className="text-2xl font-semibold text-red-800">Error Encountered</h1>
          <p className="text-red-600">
            {this.getErrorMessage(this.state.error)}
          </p>

          <div className="flex flex-col gap-3">
            <button 
              className="w-full border border-gray-300 rounded-md py-2 bg-white hover:bg-gray-100 text-gray-800 transition"
              onClick={() => window.location.reload()}
            >
              <span className="mr-2">🔄</span>
              Retry
            </button>

            <button 
              className="w-full border border-gray-300 rounded-md py-2 bg-white hover:bg-gray-100 text-gray-800 transition"
              onClick={() => window.location.href = '/'}
            >
              <span className="mr-2">🏠</span>
              Return Home
            </button>
          </div>

          {isDevelopment && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md overflow-auto">
              <p className="text-sm font-mono text-gray-700 whitespace-pre-wrap">
                {this.state.error.stack || this.state.error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;