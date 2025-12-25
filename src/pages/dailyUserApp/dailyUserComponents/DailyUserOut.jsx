import React from 'react'
import {  ArrowLeft } from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom';

const DailyUserOut = () => {

  // const navigate = useNavigate();

  return (
    <div className='fixed left-4 bottom-6 z-100 rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-200 active:bg-gray-200 cursor-pointer'>
      <NavLink to={'/'}>
        <ArrowLeft className='text-gray-500'/>
      </NavLink>
    </div>
  )
}

export default DailyUserOut
