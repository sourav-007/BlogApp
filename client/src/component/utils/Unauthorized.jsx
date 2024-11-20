import React from 'react'
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Unauthorized() {

    const navigate = useNavigate()

    const handleGoBack = () => {
        // if(window.history.length > 1){
        //     console.log('whl:', window.history.length);
        //     navigate(-2)
        // }
        navigate('/')
    }

    return (
        <div className="h-auto mt-32 flex items-center justify-center">
            <div className="flex flex-col items-center max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <FaExclamationTriangle className="mx-auto h-12 w-12 text-yellow-400" />
                <h1 className="mt-4 text-3xl font-bold text-primary-text">Unauthorized Access</h1>
                <p className="mt-2 text-lg text-gray-700">
                    Sorry, you don't have permission to access this page.
                </p>
                <strong className="mt-2 text-xl text-gray-500">
                    Please login to access all the blogs.
                </strong>
                <button className="flex mt-6 bg-primary-btn text-primary-btn-text p-2 w-fit rounded-lg " onClick={handleGoBack}>
                    Return back
                </button>
            </div>
        </div>
    )
}

export default Unauthorized