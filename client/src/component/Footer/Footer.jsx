import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle, FaInstagram, FaFacebookF, FaBloggerB } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import { useAuth } from '../../context/AuthContext';

function Footer() {

    const { isLoggedIn, getUser, subscribe, unsubscribe } = useAuth()
    const [email, setEmail] = useState('')

    const handleSubscribe = async (e) => {
        e.preventDefault()

        try {
            await subscribe(email)
            setEmail('')
        } catch (error) {
            console.error("Subscribe error", error.message);
        }
    }

    const handleUnsubscribe = async () =>{
        try {
            await unsubscribe()
        } catch (error) {
            console.error("Unsubscribe error", error.message);
        }
    }

    return (
        <>
            <footer className={`relative flex flex-col w-full h-44 ${getUser?.role === 'user' ? 'h-80' : 'h-44'} flex-wrap bg-gray-900 py-3 sm:flex-nowrap sm:justify-start`}>

                {
                    isLoggedIn && getUser?.role === 'user' &&(
                        getUser?.isSubscriber === false ? (
                            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mt-10 px-4'>

                                <div className='flex flex-col gap-2 items-start text-white md:w-1/2'>
                                    <h3 className='text-3xl md:text-4xl font-bauhaus font-bold'>
                                        Subscribe to Our Newsletter
                                    </h3>
                                    <h4 className='text-sm md:text-base lg:text-lg font-bauhaus'>
                                        Subscribe to get the latest blogs, trends, and updates delivered straight to your inbox.
                                    </h4>
                                </div>

                                <form className="relative flex items-center justify-between w-full md:w-1/3 rounded-2xl border shadow-lg bg-white"
                                    onSubmit={handleSubscribe}>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-14 w-full rounded-2xl py-4 pl-5 pr-40 outline-none bg-white text-gray-700 placeholder-gray-400"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 inline-flex h-11 items-center justify-center rounded-xl bg-primary-btn px-5 
                                        font-medium font-sans text-white hover:bg-[#2B2D42]"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mt-10 px-4'>

                                <div className='flex flex-col gap-2 items-start text-white md:w-1/2'>
                                    <h3 className='text-3xl md:text-4xl font-bauhaus font-bold'>
                                        Subscribe to Our Newsletter
                                    </h3>
                                    <h4 className='text-sm md:text-base lg:text-lg font-bauhaus'>
                                        Subscribe to get the latest blogs, trends, and updates delivered straight to your inbox.
                                    </h4>
                                </div>

                                <div className='flex justify-center md:w-auto'>
                                    <button
                                        type="submit"
                                        className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 font-medium font-sans
                                        text-primary-text hover:bg-slate-100"
                                        onClick={handleUnsubscribe}
                                    >
                                        Unsubscribe
                                    </button>
                                </div>
                            </div>

                        )
                    )
                }


                <div className="container m-auto w-full max-w-[82rem] px-4 sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center justify-between">
                        <Link to={getUser?.role === 'admin' ? '/dashboard' : '/'} className="flex items-center text-white 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl font-bold font-mono ">
                            <FaBloggerB className='text-special' />logApp
                        </Link>
                    </div>
                    <div className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block">
                        <div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-center sm:ps-5 ">
                            <Link
                                className="font-medium text-base  text-white hover:text-gray-200 focus:text-gray-400 focus:outline-none"
                                to="#"
                                aria-current="page"
                            >
                                About
                            </Link>
                            <span className=" text-gray-300 before:content-['/']"></span>
                            <Link
                                className="font-medium text-base  text-white hover:text-gray-200 focus:text-gray-400 focus:outline-none"
                                to="#"
                            >
                                Service
                            </Link>
                            <span className=" text-gray-300 before:content-['/']"></span>
                            <Link
                                className="font-medium text-base  text-white hover:text-gray-200 focus:text-gray-400 focus:outline-none"
                                to="#"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div
                        id="hs-navbar-example"
                        className="hs-collapse hidden grow basis-auto overflow-hidden transition-all duration-300 sm:block"
                        aria-labelledby="hs-navbar-example-collapse "
                    >
                        <div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5">
                            <Link
                                className="size-8 inline-flex justify-center items-center gap-x-2 font-semibold rounded-full text-base
                                 text-white hover:bg-gray-502focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                to="#"
                            >
                                <FaGoogle className="shrink-0 size-4" />
                            </Link>

                            <Link
                                className="size-8 inline-flex justify-center items-center gap-x-2 font-semibold rounded-full text-base 
                                 text-white hover:bg-gray-502focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                to="#"
                            >
                                <FaXTwitter className="shrink-0 size-4" />
                            </Link>

                            <Link
                                className="size-8 inline-flex justify-center items-center gap-x-2 font-semibold rounded-full text-base 
                                 text-white hover:bg-gray-502focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                to="#"
                            >
                                <FaFacebookF className="shrink-0 size-4" />
                            </Link>

                            <Link
                                className="size-8 inline-flex justify-center items-center gap-x-2 font-semibold rounded-full text-base 
                                 text-white hover:bg-gray-502focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                to="#"
                            >
                                <FaInstagram className="shrink-0 size-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer