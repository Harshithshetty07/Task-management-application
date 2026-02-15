import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Enable MSW in development mode
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // Start the MSW worker
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

// Initialize app with MSW
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
