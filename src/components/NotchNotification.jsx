import { Bell } from 'lucide-react'
import React from 'react'

const NotchNotification = ({user}) => {
  return (
    <div className='w-full px-2'>
      <p className='w-full text-[10px] text-blue-600'>{user?.name || ""}</p>
      <div className='h-[30px] overflow-y-auto
            [&::-webkit-scrollbar]:hidden p-2 pt-1 text-[13px]'>
        <p className=''>Notification Panel</p>
      </div>
    </div>
  )
}

export default NotchNotification
