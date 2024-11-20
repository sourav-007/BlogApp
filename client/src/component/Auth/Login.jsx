import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaRegArrowAltCircleRight, FaRegEye, FaRegEyeSlash, FaBloggerB } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

function Login() {

    const { login } = useAuth()
    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    })

    const handleInputs = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    }



    const handleLogin = async (e) => {

        e.preventDefault();

        try {
            await login(loginUser)
        } catch (error) {
            console.error('Login error:', error.message);
        }
    }

    const [showPassword, setShowPassword] = useState(false)

    const passwordToggle = () => {
        setShowPassword((toggle) => !toggle)
    }


    return (
        <>
            <div className="flex  flex-col items-center mt-32 mb-5 justify-center bg-gray-100">
                <div className="w-50 flex max-w-md flex-col rounded-[35px] bg-white px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10  border border-solid border-[#F8F8FF]">
                    <div className="flex items-center self-center text-xl font-medium text-primary-text sm:text-3xl">
                        <FaBloggerB className='text-special' />logApp
                    </div>

                    <div className="mt-4 self-center text-xl text-primary-text sm:text-sm">
                        Enter your credentials to get access account
                    </div>
                    <div className="mt-10">
                        <form onSubmit={handleLogin}>
                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-1 pl-1 text-xs tracking-wide text-primary-text font-medium"
                                    htmlFor="email"
                                >
                                    E-Mail Address:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaEnvelope className="fas fa-at text-special" />
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-special focus:outline-none"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={loginUser.email}
                                        onChange={handleInputs}
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col">
                                <label
                                    className="mb-1 pl-1 text-xs tracking-wide text-primary-text font-medium"
                                    htmlFor="password"
                                >
                                    Password:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <span>
                                            <FaLock className="fas fa-lock text-special" />
                                        </span>
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-special focus:outline-none"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={loginUser.password}
                                        onChange={handleInputs}
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                    <div className="absolute right-0 top-0 
                                        inline-flex h-full w-10 items-center 
                                        justify-center text-gray-400"
                                        onClick={passwordToggle}
                                    >
                                        {showPassword ? (
                                            <FaRegEye className="fas fa-lock text-gray-400 cursor-pointer" />
                                        ) : (
                                            <FaRegEyeSlash className="fas fa-lock text-gray-400 cursor-pointer" />
                                        )}
                                    </div>
                                </div>
                                <Link to='/forgot-password' className='mt-2 pl-1 text-xs w-fit tracking-wide text-special hover:text-special-hover font-bold cursor-pointer' >
                                    Forgot your password?
                                </Link>
                            </div>
                            <div className="flex w-full">
                                <button
                                    className="mt-2 flex w-full items-center justify-center rounded-2xl bg-special py-2 text-sm text-white 
                                    transition duration-150 ease-in hover:bg-special-hover focus:outline-none sm:text-base"
                                    type="submit"
                                >
                                    <span className="mr-2 uppercase">
                                        Login
                                    </span>
                                    <span>
                                        <span>
                                            <FaRegArrowAltCircleRight className="h-[1.2rem] w-[1.2rem]" />
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 flex items-center justify-center">
                            <p
                                className="inline-flex items-center text-center text-xs font-medium text-gray-700"
                            >
                                <span className="ml-2 text-xs">
                                    Don't have an account?{' '}
                                </span>
                            </p>
                            <Link
                                className="ml-2 text-sm font-bold text-special hover:text-special-hover"
                                to="/register"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login