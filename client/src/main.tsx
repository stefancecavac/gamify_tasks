import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './context/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { ToastContextProvider } from './context/toastContext'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
