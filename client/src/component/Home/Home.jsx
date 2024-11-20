import React from 'react'
import LatestRealease from './LatestRealease'
import Entertainment from './Entertainment'
import videoSrc from '../../assets/img/h.mp4';
import hero1 from '../../assets/img/hero1.webp'
import hero2 from '../../assets/img/hero2.webp'
import hero3 from '../../assets/img/hero3.webp'
import hero4 from '../../assets/img/hero4.webp'
import { useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import Sports from './Sports';
import { useAuth } from '../../context/AuthContext';
import Health from './Health';
import Business from './Business';
import Tech from './Tech';
import TrendingPost from './TrendingPost';
import Testimonials from './Testimonials';


function Home() {

  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <div className='w-full sm:mt-40 md:mt-32 mb-4'>

        {!isLoggedIn &&
          <div className="container mx-auto relative mt-5 mb-5 h-[30rem] w-full overflow-hidden">
            {/* <video
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 px-6 min-h-full min-w-full object-cover opacity-[60%] brightness-50 "
              src={videoSrc} type="video/mp4"
            /> */}
            <img src={hero2}
              className="absolute top-0 left-0 px-6 min-h-full min-w-full object-cover brightness-50 " />

            <div className="relative z-10 flex flex-col h-full items-center justify-center">
              <div className="text-center xl:max-w-2xl lg:max-w-2xl md:max-w-2xl sm:max-w-lg items-center justify-center font-bauhaus">
                <div className='flex flex-row items-center justify-center '>
                  <h1 className="mb-4 xl:text-7xl lg:text-7xl md:text-7xl sm:text-5xl font-medium font-bauhaus text-white">
                    Welcome to <span className='text-heading'>BlopApp</span>
                  </h1>
                  <div className='2xl:mb-8 xl:mb-8 lg:mb-8 md:mb-8 sm:mb-[1.725rem] pl-1 flex flex-col items-center justify-center'>
                    <div className='md:w-[0.4rem] lg:w-[0.4rem] xl:w-[0.4rem] 2xl:w-[0.4rem] sm:w-[0.28rem] md:h-10 lg:h-10 xl:h-10 2xl:h-10 sm:h-[1.725rem] 
                    bg-white font-bauhaus sm:mb-[0.1rem] md:mb-1 lg:mb-1 xl:mb-1 2xl:mb-1'></div>
                    <div className='sm:w-[0.5rem] md:w-[0.7rem] lg:w-[0.7rem] xl:w-[0.7rem] 2xl:w-[0.7rem] sm:h-2 md:h-3 lg:h-3 xl:h-3 2xl:h-3 rounded-full bg-heading'></div>
                  </div>
                </div>

                <p className="mb-4 text-xl px-5 text-white">
                  Discover insightful articles, engaging stories, and expert opinions on various topics.
                </p>
                <strong className='mb-8 flex items-center justify-center text-white text-xl'>
                  Please get started to continue your journey.
                </strong>
              </div>
              <button className="flex items-center gap-1 rounded bg-white px-4 py-2 font-bold text-primary-text font-sans transition-colors hover:bg-gray-200 group"
                onClick={() => navigate('/login')}>
                Get Started <span className='transition-colors text-xl text-primary-text group-hover:text-heading'><FaArrowRightLong /></span>
              </button>
            </div>
          </div>
        }

        <div className='flex flex-col items-center gap-[120px] md:gap-[60px] sm:gap-[60px] lg:gap-[60px] '>
          <TrendingPost />
          <div className='flex flex-col z-[9] self-stretch gap-[120px] md:gap-[90px] sm:gap-[60px]'>
            <LatestRealease />
          </div>
          {/* <Entertainment />
          <Sports />
          <Health />
          <Business />
          <Tech /> */}
        </div>
        <Testimonials />
      </div>
    </>
  )
}

export default Home