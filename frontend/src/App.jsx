import { useState } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
