import React from 'react'
import BookCamperCard from '../components/dashboardComponents/BookCamperCard'
import { ChevronRight, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const OrderCamper = () => {

  const navigate = useNavigate();

  return (
    <div className='mx-auto w-full max-w-md px-4 p-4 py-23 space-y-5'>
      <BookCamperCard />
       <div
       onClick={()=>navigate('/my-orders')}
       className="flex justify-between text-gray-500 p-4 border border-gray-300 rounded-lg active:bg-gray-100 ">
        <div className="flex gap-5">
          <Truck size={18}/>
          <p className="text-[13px]">My Orders</p>
        </div>
        <ChevronRight size={18} />
      </div>
    </div>
  )
}

export default OrderCamper
