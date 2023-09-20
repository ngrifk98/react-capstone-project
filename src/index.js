import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from the correct location
import './index.css'; // Import other global CSS files as needed
import './components/LoginPage.css'; // Correct relative path to the CSS file
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root')); // Use createRoot from react-dom/client

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
