import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SubHero2 } from './SubHero2';
import SubHero1 from './SubHero1';


export default function Hero() {
  return (
    <div className='mt-[-10px]'>
      {/* SECTION-1 */}
      <SubHero1/>
      {/* SECTION-2 */}
      <SubHero2/>
    </div>
  )
}
