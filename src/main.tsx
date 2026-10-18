// Cascade layer order first, then Mantine (inside its layer), then the global styles.
import '@styles/layers.css';
import '@mantine/core/styles.layer.css';
import '@styles/global.css';
// Initializes i18next before the first render.
import '@config/localization';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
