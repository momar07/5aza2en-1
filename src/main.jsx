import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <DataProvider>
            <App />
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  fontFamily: 'Cairo, sans-serif',
                  direction: 'rtl',
                  background: '#1a1a2e',
                  color: '#f0d060',
                  border: '1px solid #b8962e',
                },
                duration: 3000,
              }}
            />
          </DataProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
