import CommentSection from '@/components/commentSection'
import CulturalSection from '@/components/CulturalSection'
import DestinationsSection from '@/components/DestinationSection'
import FeaturesSection from '@/components/FeatureSection'
import Footer from '@/components/Footer'
import HeaderSlider from '@/components/Header'
import Navbar from '@/components/Navbar'
import WildlifeSection from '@/components/WildlifeSection'
import React from 'react'

const Home = () => {
  return (
    // <div className='flex flex-col items-center justify-center min-h-screen '>
    <div className='bg-white space-x-8'>
        {/* <Navbar/> */}
        <HeaderSlider/>
        <div className=''>
          <FeaturesSection/>
          <DestinationsSection/>
          <CulturalSection/>
          {/* <CurrentWeather/> */}
          {/* <WeatherCard/> */}
          <WildlifeSection/>
          <CommentSection/>
        </div>
        {/* <Footer/> */}
        
    </div>
    
  )
}

export default Home