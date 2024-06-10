import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Signup from './pages/Signup'
import { UserContextProvider } from './context/UserContext'
import AuthRedirect from './layouts/AuthRedirect'
import ProtectedRoute from './layouts/ProtectedRoute'
import { StateContextProvider } from './context/MainStateContext'


const router = createBrowserRouter([
  {
    path: '/',
    element:<MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element:<ProtectedRoute><Home></Home></ProtectedRoute>
      }
    ]
  },
  {
    path: '/signup',
    element: <AuthRedirect><Signup></Signup></AuthRedirect>
  }

])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <StateContextProvider>
      <RouterProvider router={router}></RouterProvider>
      </StateContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
