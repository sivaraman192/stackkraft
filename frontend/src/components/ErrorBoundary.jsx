import React from 'react';
import ServerError from '../pages/ServerError';

class ErrorBoundary extends React.Component {
 constructor(props) {
  super(props);
  this.state = { hasError: false, error: null };
 }

 static getDerivedStateFromError(error) {
  // Update state so the next render will show the fallback UI.
  return { hasError: true, error };
 }

 componentDidCatch(error, errorInfo) {
  // You can also log the error to an analytics reporting service
  console.error("ErrorBoundary caught an exception:", error, errorInfo);
 }

 render() {
  if (this.state.hasError) {
   // Render our custom animated 500 error page
   return <ServerError error={this.state.error} />;
  }

  return this.props.children;
 }
}

export default ErrorBoundary;
