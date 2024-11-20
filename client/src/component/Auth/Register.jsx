import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaRegArrowAltCircleRight, FaRegEye, FaRegEyeSlash, FaBloggerB } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function Register() {


    const { register, errors } = useAuth();
    const [regData, setRegData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })

    
    const handleInputs = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setRegData({ ...regData, [name]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            await register(regData)
        } catch (error) {
            console.error('Registration error:', error.message);
        }

    }

    const [showPassword, setShowPassword] = useState(false)

    const passwordToggle = () => {
        setShowPassword((toggle) => !toggle)
    }

    return (
        <>
            <div className="flex flex-col mt-32 mb-5 items-center justify-center bg-slate-100">
                <div className="w-50 flex max-w-md flex-col rounded-[35px] bg-white px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10  
                border border-solid border-[#F8F8FF]">
                    <div className="flex items-center self-center text-xl font-medium text-primary-text sm:text-3xl">
                        <FaBloggerB className='text-special' />logApp
                    </div>
                    <div className="mt-3 self-center text-xl text-primary-text sm:text-sm">
                        Enter your credentials to get access account
                    </div>
                    <div className="mt-7">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-1 pl-1 text-xs tracking-wide text-primary-text font-medium"
                                    htmlFor="firstname"
                                >
                                    First name:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaUser className="fas fa-user text-special " />
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-special focus:outline-none"
                                        id="firstname"
                                        name="firstname"
                                        value={regData.firstname}
                                        onChange={handleInputs}
                                        placeholder="Enter your first name"
                                        type="text"
                                    />
                                </div>
                                {errors.firstname && <span className="text-xs text-red-800 tracking-wide ml-2">{errors.firstname}</span>}
                            </div>
                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-1 pl-1 text-xs tracking-wide text-primary-text font-medium"
                                    htmlFor="lastname"
                                >
                                    Last name:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaUser className="fas fa-user text-special " />
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-special focus:outline-none"
                                        id="lastname"
                                        name="lastname"
                                        value={regData.lastname}
                                        onChange={handleInputs}
                                        placeholder="Enter your last name"
                                        type="text"
                                    />
                                </div>
                                {errors.lastname && <span className="text-xs text-red-800 tracking-wide ml-2">{errors.lastname}</span>}
                            </div>
                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-1 pl-1 text-xs tracking-wide text-primary-text font-medium"
                                    htmlFor="email"
                                >
                                    E-Mail Address:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaEnvelope className="fas fa-at text-special " />
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-special focus:outline-none"
                                        id="email"
                                        name="email"
                                        value={regData.email}
                                        onChange={handleInputs}
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                </div>
                                {errors.email && <span className="text-xs text-red-800 tracking-wide ml-2">{errors.email}</span>}
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
                                            <FaLock className="fas fa-lock text-special " />
                                        </span>
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-special focus:outline-none"
                                        id="password"
                                        name="password"
                                        value={regData.password}
                                        onChange={handleInputs}
                                        placeholder="Enter your password"
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
                                {errors.password && <span className="text-xs text-red-800 tracking-wide ml-2">{errors.password}</span>}
                            </div>
                            <div className="flex w-full">
                                <button className="mt-2 flex w-full items-center justify-center rounded-2xl
                                     bg-special py-2 text-sm text-white transition duration-150 ease-in 
                                     hover:bg-special-hover focus:outline-none sm:text-base"
                                    type="submit"
                                >
                                    <span className="mr-2 uppercase">
                                        Sign Up
                                    </span>
                                    <span>
                                        <FaRegArrowAltCircleRight className="h-[1.2rem] w-[1.2rem]" />
                                    </span>
                                </button>
                            </div>
                        </form>
                        <div className="mt-5 flex items-center justify-center">
                            <p
                                className="inline-flex items-center text-center text-xs font-medium text-gray-700"
                            >
                                <span className="ml-2">
                                    You have an account?{' '}
                                </span>
                            </p>
                            <Link
                                className="ml-2 text-sm font-bold text-special hover:text-special-hover "
                                to="/login"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register