import React from 'react'
import heroImage1 from '../../../assets/Hero_image1.jpg'
import { useNavigate } from 'react-router-dom'


export default function Hero() {
  const Navigate = useNavigate();
  return (
    <div className=''>
      {/* TOP SECTION */}
      <div className='flex w-full'>
        <div className='w-[50%]'>
          <img src={heroImage1} alt="heroImage1" />
        </div>
        <div className='w-[50%] flex flex-col gap-y-5 justify-center md:p-10 items-center'>
          <h1 className='leftTo text-center text-3xl font-bold text-indigo-500 text-shadow-lg'>Prioritize Your
            Mental Health</h1>
          <p className='text-center text-lg font-[500] rightTo'>Get mental health support today.
            Predict your mental health with simple step and who is right for you.
          </p>
        
          <button 
          onClick={()=>Navigate('/check-health')}
          className='scale bg-indigo-500 w-[40%] p-2 rounded-[10px] text-lg text-white font-semibold cursor-pointer hover:shadow-lg text-shadow-sm hover:text-shadow-lg hover:scale-[1.02] transition delay-[.1s] duration-2s'>Check your mental health</button>
        </div>
      </div>
      <div>

      </div>
      <div>

      </div>
    </div>
  )
}
