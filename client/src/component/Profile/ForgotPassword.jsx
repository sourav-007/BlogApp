import React, { useState } from 'react'
import { FaEnvelope, FaRegArrowAltCircleRight, FaLongArrowAltLeft, FaBloggerB, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';



function ForgotPassword() {

    const { forgotPassword, showAlert } = useAuth()

    const [email, setEmail] = useState('')

    const handleInputs = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await forgotPassword(email)
        } catch (error) {
            console.error("Forgot password error", error.message);
        }

    }

    const navigate = useNavigate()


    return (
        <section className='flex sm:flex-col sm:gap-2 h-auto mt-32 justify-center bg-gray-100 '>
            {/* md:h-[75vh] lg:h-[80vh] xl:h-[85vh] 2xl:h-[90vh] */}

            {
                showAlert &&
                <div className='flex items-center justify-center mt-1'>
                    <div className="w-fit flex items-center border-t-4 border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 
                    dark:bg-gray-800 dark:text-blue-400"
                        role="alert" id="alert-border-1">
                        <FaInfoCircle className='h-5 w-5 flex-shrink-0' />
                        <div className="ms-3 text-base font-mono font-medium">Please check your mail to reset your password!</div>
                    </div>
                </div>
            }

            <div className="flex sm:flex-col sm:gap-5 md:flex-row items-center py-4 px-2 justify-around bg-gray-100 ">

                <div className='flex flex-col font-bauhaus font-semibold 2xl:text-7xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl text-primary-text'>
                    <span className='leading-tight '>
                        You forgot your <span className='text-special'> password</span>?<br />Seamless password reset<br />—just a few clicks away!
                    </span>
                    {/* <span>Don't worry, we've got you covered!</span> */}
                </div>

                <div className=" flex flex-col h-80 2xl:w-[30rem] xl:w-[27rem] lg:w-[24rem] md:w-[21rem] sm:w-[18rem] rounded-[35px] bg-white 
                px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10  border border-solid border-[#F8F8FF]">
                    <div className="flex items-center self-center text-xl mt-3 font-medium text-primary-text sm:text-3xl">
                        <FaBloggerB className='text-special' />logApp
                    </div>

                    <div className="mt-10 w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-2 pl-1 text-sm tracking-wide text-primary-text font-medium"
                                    htmlFor="email"
                                >
                                    E-Mail Address:
                                </label>
                                <div className="relative flex flex-row items-center">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaEnvelope className=" text-special" />
                                    </div>
                                    <input
                                        className="w-full h-11 rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-lg placeholder-gray-500 
                                    focus:border-special focus:outline-none"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleInputs}
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="flex w-full">
                                <button
                                    className="mt-2 flex w-full h-10 items-center justify-center rounded-2xl bg-special py-2 text-sm text-white 
                                transition duration-150 ease-in hover:bg-special-hover focus:outline-none sm:text-base"
                                    type="submit"
                                // onClick={()=> navigate('/reset-password')} // temporary use for checking
                                >
                                    <span className="mr-2 text-lg">
                                        Reset Password
                                    </span>
                                    <span>
                                        <span>
                                            <FaRegArrowAltCircleRight className="h-[1.2rem] w-[1.2rem]" />
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </form>
                        <div className='flex justify-end' onClick={()=> navigate(-1)}>
                            <Link className='flex items-center w-fit px-1 gap-1 mt-4 text-lg font-medium cursor-pointer text-primary-text'>
                                <FaLongArrowAltLeft className='text-special' />
                                <span>Back</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword