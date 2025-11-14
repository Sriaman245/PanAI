import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import { useClerk,useUser,UserButton } from '@clerk/clerk-react';


const Navbar = () => {
    const navigate=useNavigate();
    const {user}=useUser();
    const {openSignIn}=useClerk();
  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between item-center py-3 px-4 sm:px-20 xl:px-20'>
      <div className='flex items-center justify-center gap-3'>
        <img src={assets.logo} alt="logo" className='w-12 sm:w-12 cursor-pointer' onClick={()=>navigate('/')}/>
        <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold'>Pan<span className='bg-gradient-to-r from-[#3C81F6] to-[#9234EA] bg-clip-text text-transparent'>AI</span></h1>
      </div>
        
        {
            user 
            ?  (<div className='border-2 border-gray-400 flex items-center justify-center px-5  my-2 rounded-full gap-2 text-gray-600'>
              <UserButton/>
              {user.fullName}
            </div> )
            : <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-4 py-2.5'>Get Started <ArrowRight className='w-4 h-4'/></button>
        }
    </div>
  )
}

export default Navbar
