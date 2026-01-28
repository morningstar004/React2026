import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route ,RouterProvider ,createBrowserRouter } from 'react-router-dom'
import Layout from './layout.jsx'
import Home from './components/Home/home.jsx'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
