import '../style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';

const root = document.getElementById('root');

if (root === null) {
  throw new Error('NOWAY');
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
