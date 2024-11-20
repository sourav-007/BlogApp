import React, { useState } from 'react'
import { FaLock, FaRegArrowAltCircleRight, FaBloggerB, FaInfoCircle } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function ResetPassword() {

    const { resetPassword, showAlert } = useAuth()
    const { token } = useParams()

    const [showPassword, setShowPassword] = useState(false)

    const toggleVisibility = (set) => {
        // set((prev) => !prev);
        setShowPassword(!showPassword)
    };

    const [data, setData] = useState({
        password: '',
        confirmPassword: ''
    })

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        try {
            await resetPassword(token, { password: data.password, confirmPassword: data.confirmPassword });
        } catch (error) {
            console.error("Reset password error", error.message);
        }

    }

    return (
        <section className='flex sm:flex-col sm:gap-2 h-auto mt-32 mb-5 justify-center bg-gray-100'>

            {
                showAlert &&
                <div className='flex items-center justify-center mt-1'>
                    <div class="mb-4 flex items-center border-t-4 border-green-400 bg-green-100 p-4 text-green-800"
                        role="alert">
                        <FaInfoCircle className='h-5 w-5 flex-shrink-0' />
                        <div class="ms-3 flex text-sm font-medium flex-col">
                            Your password has been reset seccessfully!
                            <span>Please go login or check your mail!</span>
                        </div>
                    </div>
                </div>
            }

            {/* <div className='flex items-center justify-center mt-1'>
                <div class="mb-4 flex items-center border-t-4 border-red-400 bg-red-100 p-4 text-red-800"
                    role="alert">
                    <FaInfoCircle className='h-5 w-5 flex-shrink-0' />
                    <div class="ms-3 flex text-sm font-medium flex-col">
                        It looks like you clicked on an invalid password reset link. Please try again.
                    </div>
                </div>
            </div> */}

            <div className="flex sm:flex-col sm:gap-5 md:flex-row items-center py-4 px-2 justify-around bg-gray-100 ">

                <div className='flex flex-col font-bauhaus font-semibold 2xl:text-7xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl text-primary-text'>
                    <span className='leading-tight '>
                        {/* Enter your <span className='text-special'>new password</span> to<br/> securely update your <span className='text-special'>old one</span>. */}
                        Secure your account<br />—provide a <span className='text-special'>new password</span><br /> to replace the <span className='text-special'>old one</span>.
                    </span>
                </div>

                <div className=" flex flex-col 2xl:w-[30rem] xl:w-[27rem] lg:w-[24rem] md:w-[21rem] sm:w-[18rem] rounded-[35px] bg-white 
                px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10  border border-solid border-[#F8F8FF]">
                    <div className="flex items-center self-center text-xl mt-3 font-medium text-primary-text sm:text-3xl">
                        <FaBloggerB className='text-special' />logApp
                    </div>

                    <div className="mt-10 w-full">
                        <form onSubmit={handleSubmit}>

                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-2 pl-1 text-sm tracking-wide text-primary-text font-medium"
                                    htmlFor="password"
                                >
                                    Password:
                                </label>
                                <div className="relative flex flex-row items-center">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaLock className=" text-special" />
                                    </div>
                                    <input
                                        className="w-full h-11 rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-lg placeholder-gray-500 
                                    focus:border-special focus:outline-none"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={data.password}
                                        onChange={handleInputs}
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 flex flex-col">
                                <label
                                    className="mb-2 pl-1 text-sm tracking-wide text-primary-text font-medium"
                                    htmlFor="confirmpassword"
                                >
                                    Confirm password:
                                </label>
                                <div className="relative flex flex-row items-center">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaLock className=" text-special" />
                                    </div>
                                    <input
                                        className="w-full h-11 rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-lg placeholder-gray-500 
                                    focus:border-special focus:outline-none"
                                        id="confirmpassword"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        value={data.confirmPassword}
                                        onChange={handleInputs}
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                </div>
                            </div>

                            <label class="flex flex-row items-center gap-2 pl-1 mb-2 text-sm tracking-wide text-primary-text font-medium">
                                <input class="h-4 w-4 dark:border-white-400/20 dark:scale-100 transition-all duration-500 ease-in-out hover:scale-110 
                                checked:scale-100" type="checkbox" 
                                onClick={() => toggleVisibility(setShowPassword)}/> Show password
                            </label>

                            <div className="flex w-full">
                                <button
                                    className="mt-2 flex w-full h-10 items-center justify-center rounded-2xl bg-special py-2 text-sm text-white 
                                transition duration-150 ease-in hover:bg-special-hover focus:outline-none sm:text-base"
                                    type="submit"
                                >
                                    <span className="mr-2 text-lg">
                                        Submit
                                    </span>
                                    <span>
                                        <span>
                                            <FaRegArrowAltCircleRight className="h-[1.2rem] w-[1.2rem]" />
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword