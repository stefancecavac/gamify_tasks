import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import Signup from './pages/Signup'
import AuthRedirect from './layouts/AuthRedirect'
import ProtectedRoute from './layouts/ProtectedRoute'
import { Provider } from 'react-redux'
import { store } from './redux/store'


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <ProtectedRoute><Home></Home></ProtectedRoute>
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
      <Provider store={store}>

        <RouterProvider router={router}></RouterProvider>
      </Provider>
  </React.StrictMode>,
)
