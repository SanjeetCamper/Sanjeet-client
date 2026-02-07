import { ArrowLeft, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {

    const navigate = useNavigate();

  return (
    <div className='text-gray-500' onClick={()=>navigate(-1)}>
      <ChevronLeft className='' />
    </div>
  )
}

export default BackButton
