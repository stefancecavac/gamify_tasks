import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './context/authContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <App/>
        </AuthContextProvider>
      </QueryClientProvider>
  </React.StrictMode>,
)
