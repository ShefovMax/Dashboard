import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '@app/store.ts';
import { AppThemeProvider } from '@app/providers/ThemeProvider';
import App from '@app/App';
import './colors.css';
import { ZoomBlocker } from '@shared/lib/ZoomBlocker';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppThemeProvider>
          <ZoomBlocker />
          <App />
        </AppThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}
