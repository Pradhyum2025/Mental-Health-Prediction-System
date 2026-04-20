import { useState } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { Outlet } from 'react-router-dom'
import Login from './components/core/Auth/Login'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Toaster/>
    <Login/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
