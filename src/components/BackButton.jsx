import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {

    const navigate = useNavigate();

  return (
    <div className='text-gray-500' onClick={()=>navigate(-1)}>
      <ArrowLeft />
    </div>
  )
}

export default BackButton
