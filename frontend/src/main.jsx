import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Hero from './components/core/Home/Hero.jsx'
import UserFrom from './components/core/Form/UserFrom.jsx'
import { AboutUs } from './components/common/About.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {path:'/',element:<Hero/>},
      {path:'/check-health',element:<UserFrom/>},
      {path:'/about',element:<AboutUs/>}
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
