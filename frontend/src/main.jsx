import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Global styles
import App from './App.jsx' // Main app component
import { BrowserRouter } from 'react-router-dom';
import TestContextProvider, { TestContext } from './context/TestContext.jsx'; // Keep the context

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TestContextProvider>
        <App />
      </TestContextProvider>
    </BrowserRouter>
  </StrictMode>
);
