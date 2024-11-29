import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import nf from '../../assets/img/404.svg'
import { FaArrowLeftLong } from 'react-icons/fa6'

function NotFound() {

    const { isLoggedIn } = useAuth()
    const role = localStorage.getItem('Role')

    return (
        <>
            <div className="w-full h-auto flex flex-col items-center justify-center mt-28 mb-5 bg-slate-100">
                <div className="flex flex-col items-center justify-center">
                    <img src={nf} alt="notfound" className='h-80 w-80' />
                    <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800">
                        Page Not Found
                    </p>
                    <p className="md:text-lg lg:text-xl text-gray-600 mt-6">
                        Sorry, the page you are looking for could not be found.
                    </p>
                    <strong className="md:text-lg lg:text-2xl text-gray-600 mt-6">
                        Please log in to access the blogs.
                    </strong>
                    <Link
                        to={isLoggedIn ? (role === 'admin' ? '/dashboard' : '/') : '/'}
                        className="flex items-center space-x-2 bg-primary-text hover:bg-primary-btn text-gray-100 px-4 py-2 mt-8 rounded 
                        transition duration-150 group"
                        title="Return Home"
                    >
                        <FaArrowLeftLong className='group-hover:text-special' />
                        <span>Return back</span>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default NotFound