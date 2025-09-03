import ImageSliderHeader from '@/components/Header'
import Navbar from '@/components/Navbar'
import React from 'react'

const Home = () => {
  return (
    // <div className='flex flex-col items-center justify-center min-h-screen '>
    <div className='bg-gray-400'>
        <Navbar/>
        <ImageSliderHeader/>
    </div>
    
  )
}

export default Home