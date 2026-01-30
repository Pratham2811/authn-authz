import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />
   <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          // Base style for ALL toasts
          className:
            "rounded-xl bg-zinc-900 text-white px-4 py-3 shadow-lg border border-zinc-800",

          style: {
            fontSize: "14px",
          },

          // Success toast
          success: {
            className:
              "rounded-xl bg-green-600 text-white px-4 py-3 shadow-lg border border-green-500",
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ecfdf5",
            },
          },

          // Error toast
          error: {
            className:
              "rounded-xl bg-red-600 text-white px-4 py-3 shadow-lg border border-red-500",
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fef2f2",
            },
          },

          // Loading toast
          loading: {
            className:
              "rounded-xl bg-blue-600 text-white px-4 py-3 shadow-lg border border-blue-500",
          },
        }}
      />
  </StrictMode>
);