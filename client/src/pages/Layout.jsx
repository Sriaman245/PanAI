import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {SignIn, useUser } from '@clerk/clerk-react';
const Layout = () => {

  const navigate=useNavigate();
  const [sideBar,setSideBar]=useState(false);
  const {user}=useUser();
  // const {openSignIn}=useClerk();
  
  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200 py-2'>
        {/* <img className='cursor-pointer w-32 sm:w-44'  src={assets.logo} alt="logo" onClick={()=>navigate('/')} /> */}
        <div className='flex items-center justify-center gap-3'>
        <img src={assets.logo} alt="logo" className='w-12 sm:w-13 cursor-pointer' onClick={()=>navigate('/')}/>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-semibold'>Pan<span className='bg-gradient-to-r from-[#3C81F6] to-[#9234EA] bg-clip-text text-transparent'>AI</span></h1>
                </div>
        {
          sideBar
          ? <X onClick={()=>setSideBar(false)} className='w-6 h-6 text-gray-600 sm:hidden'/> 
          : <Menu onClick={()=>setSideBar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>
        }
      </nav>
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
        <Sidebar sideBar={sideBar} setSideBar={setSideBar}/>
        <div className='flex-1 bg-[#F4F7FB]'>
        <Outlet/>
        </div>
      </div>
    </div>
  ):
  <div className='flex items-center justify-center h-screen'>
    <SignIn/>
    {/* {openSignIn} */}
  </div>
}

export default Layout
