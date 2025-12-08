import { useUser } from '@clerk/clerk-react';
import React from 'react'

const NotchNotification = () => {

    const {user} = useUser();

  return (
    <div>
      <div className="text-sm sm:text-sm overflow-y-auto max-h-10 no-scrollbar">
            {"Hey " + user.firstName} <br />
            🔔 Your Noticfication Panel
        </div>
    </div>
  )
}

export default NotchNotification;
