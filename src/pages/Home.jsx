import React from 'react'
import HeaderHome from '../components/HeaderHome.jsx'
import { useUser } from '@clerk/clerk-react'
import HomeUser from './HomeUser.jsx';
// import HomeHero from '../components/HomeHero';


const Home = () => {

  const {user} = useUser();

  return (
    <div className="mx-auto w-full max-w-md px-2 pt-10 text-justify pb-20 overflow-y-auto">
      {
        user ? <HomeUser />: <HeaderHome />
      }
    </div>
  )
}

export default Home
