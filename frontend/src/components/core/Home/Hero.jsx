import React from 'react'
import heroImage1 from '../../../assets/MentalHealth2.png'
import { useNavigate } from 'react-router-dom'
import { MentalHealthHero } from './Hero2';


export default function Hero() {
  const Navigate = useNavigate();
  return (
    <div className='mt-[-10px]'>
      {/* TOP SECTION */}
      <div className='flex flex-col sm:flex-row w-full bg-gradient-to-br from-blue-50 via-green-50 to-neutral-50'>
        <div className='sm:w-[50%]'>
          <img src={heroImage1} alt="heroImage1" />
        </div>
        <div className='sm:w-[50%] flex flex-col gap-y-5 justify-center p-3 md:p-10 items-center'>
          <h1 className='leftTo text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-400  px-5'>Prioritize Your
            Mental Health</h1>
          <p className='text-center text-xl font-[500] rightTo text-gray-900 mb-5'>Get mental health support today.
            Predict your mental health with simple step and who is right for you.
          </p>
        
          <button 
          onClick={()=>Navigate('/check-health')}
          className='scale px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 cursor-pointer'>Check your mental health</button>
        </div>
      </div>
      <MentalHealthHero/>
    </div>
  )
}
