import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Hero from './components/core/Home/Hero.jsx'
import UserFrom from './components/core/Form/UserFrom.jsx'
import { AboutUs } from './components/common/About.jsx'
import { Provider } from 'react-redux'
import appStore from './store/reducer/index.js'
import Signup from './components/core/Auth/SignUp.jsx'
import UserProfile from './components/core/User/Profile.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {path:'/signup',element:<Signup/>},
      {path:'/',element:<Hero/>},
      {path:'/profile',element:<UserProfile/>},
      {path:'/check-health',element:<UserFrom/>},
      {path:'/about',element:<AboutUs/>}
    ]
  }

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={appStore} >
    <RouterProvider router={router} />
      </Provider>
  </StrictMode>,
)
