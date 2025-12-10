import React from 'react'
import HeaderHome from '../components/HeaderHome.jsx'
import { useUser } from '@clerk/clerk-react'
import HomeUser from './HomeUser.jsx';
// import HomeHero from '../components/HomeHero';


const Home = () => {

  const {user} = useUser();

  return (
    <div className="mx-auto w-full max-w-md px-4 pt-27 text-justify pb-20 overflow-y-auto">
      {
        user ? <HomeUser />: <HeaderHome />
      }
    </div>
  )
}

export default Home
