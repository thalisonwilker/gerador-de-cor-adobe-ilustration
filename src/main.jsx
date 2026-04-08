import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: 'rgba(30,30,50,0.9)',
          color: '#f1f5f9',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          fontFamily: 'Inter, sans-serif',
        },
      }}
    />
    <App />
  </StrictMode>,
)
