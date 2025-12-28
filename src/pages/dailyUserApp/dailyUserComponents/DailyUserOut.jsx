import React from 'react'
import {  ArrowLeft } from "lucide-react";
import { NavLink, useNavigate } from 'react-router-dom';

const DailyUserOut = () => {

  // const navigate = useNavigate();

  return (
    <div>
      <NavLink to={'/'}>
        <ArrowLeft className='text-gray-500'/>
      </NavLink>
    </div>
  )
}

export default DailyUserOut
