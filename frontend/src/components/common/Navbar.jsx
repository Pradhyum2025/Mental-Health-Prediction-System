
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from '../../operations/auth';

export default function Navbar() {
  const loggedInUser = useSelector(store=>store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const currPath = useLocation().pathname;
  const [drop,setDrop] = useState(false)
  const handleLogin = ()=>{
    if(currPath==='/signup'){
      navigate('/')
    }
    return document.getElementById('my_modal_3').showModal();
  }
  return (
    <nav class="topTo block w-full sticky top-0  px-4  mx-auto bg-gray-800 shadow-lg lg:px-8 lg:py-3 text-white z-50 mt-2">
  <div class="container flex flex-wrap items-center justify-between mx-auto  ">
    <Link href="/" class="mr-4 block cursor-pointer py-1.5 text-lg text-indigo-500 font-bold">
      Mental Health Predection
    </Link>
 
    <div class="hidden lg:block">
      <ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      { (loggedInUser && loggedInUser.email)?
        <li
        onMouseEnter={()=>setDrop(true)}
        onMouseLeave={()=>setDrop(false)}
         class="flex items-center justify-center p-1 text-sm gap-x-2 text-slate-600 relative ">
          
         <img src={loggedInUser.image} alt="loggedInUser Image" className='rounded-full w-[2.6rem] h-[2.6rem] cursor-pointer' 
        
          />
         {drop &&
         <div
         onClick={()=>navigate('/profile')}
          className='absolute top-12 bg-white text-md font-bold  py-3 flex flex-col gap-2 rounded'>
          <p className='hover:bg-gray-300 cursor-pointer px-7 py-[5px]'>Profile</p>
          <p
          onClick={()=>signOut(dispatch,navigate)}
           className='hover:bg-gray-300 cursor-pointer px-7 py-[5px]'>logout</p>
          </div>  
         }

        </li>
        :
        <>
        {currPath==='/signup'?
        <button
        onClick={handleLogin}
         className='py-3 px-6 text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none border-none cursor-pointer'>
          Login
        </button>
        :
        <>
        <button 
        onClick={handleLogin}
        className='py-3 px-6 text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none border-none cursor-pointer'>
          Login
          </button>
          <button
          onClick={()=>navigate('/signup')}
           className='py-3 px-6 text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none border-none cursor-pointer'>
          Signup
          </button>
        </>
          }
        </>
           }

        <li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-slate-200">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
          </svg>
 
          <Link href="#" class="flex items-center text-white font-semibold">
            Conatct us
          </Link>
        </li>

        <li
        class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-slate-200">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
          </svg>
 
          <Link to="/about" class="flex items-center text-white font-semibold">
            About
          </Link>
        </li>
      </ul>
    </div>
    <button class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden" type="button">
      <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </span>
    </button>
  </div>
</nav>
  )
}
