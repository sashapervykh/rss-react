import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary.tsx';
import { ThemeProvider } from './hooks/useTheme/ThemeProvider.tsx';
import { setupStore } from './store/store.ts';

const root = document.getElementById('root');
if (!root) throw new Error('The root element was not found!');

const store = setupStore();

createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
