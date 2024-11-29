import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import default_avatar from '../../assets/img/user.png'
import { FaSignOutAlt, FaCamera } from "react-icons/fa";


function Account() {

    const { isLoggedIn, getUser, logout, avatar, updateUserDetails } = useAuth()

    const [updateUserProfile, setUpdateUserProfile] = useState({
        firstname: '',
        lastname: ''
    })

    const [currentAvatar, setCurrentAvatar] = useState(getUser?.avatar || default_avatar);

    useEffect(() => {
        if (getUser) {
            setUpdateUserProfile({
                firstname: getUser.firstname,
                lastname: getUser.lastname
            });
            setCurrentAvatar(getUser?.avatar || default_avatar)
        }
    }, [getUser]);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUpdateUserProfile({ ...updateUserProfile, [name]: value });
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await updateUserDetails(updateUserProfile)
        } catch (error) {
            console.error("Update error", error.message);
        }
    }

    const handleAvatar = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                await avatar(formData)
            } catch (error) {
                console.log(error);
                setCurrentAvatar(getUser?.avatar || default_avatar)
            }
        }
    };


    const handleLogout = async () => {

        try {
            await logout()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                isLoggedIn && (
                    <div className='mt-32 mb-5 right-0 left-0 flex items-center justify-center'>
                        <div className="relative mx-auto max-w-[28rem] rounded-lg bg-gray-100 shadow-lg border-[3px] border-solid border-special border-opacity-15">
                            <div className="px-0 pb-3">
                                <div className="my-0 text-center">
                                    <div className='bg-special bg-opacity-15 p-2 mb-16 h-28 rounded-tr-[5px] rounded-tl-[5px]' />
                                    <div className='absolute top-6 right-14 left-14'>
                                        <img className="mx-auto w-40 h-40 text-xl text-primary-btn-text border-[5px] border-solid rounded-full
                                        flex items-center justify-center object-center whitespace-normal"
                                            src={ currentAvatar }
                                            alt='avatar'
                                        />
                                    </div>
                                    <label htmlFor="avatar" className="cursor-pointer absolute right-[8.2rem] top-32">
                                        <FaCamera className='h-5 w-5 text-primary-btn cursor-pointer' />
                                        <input
                                            type="file"
                                            id='avatar'
                                            name='avatar'
                                            className="hidden"
                                            onChange={(e) => handleAvatar(e)}
                                            accept="image/*"
                                        />
                                    </label>

                                    <div className="flex flex-col px-2 py-2">
                                        <h3 className="mb-1 text-2xl font-semibold text-primary-text "> {'Hi, ' + getUser.firstname + '!'} </h3>
                                    </div>

                                    <form onSubmit={handleUpdate}>
                                        <div className='flex flex-row justify-around gap-2 px-3'>

                                            <div className="mb-5 inline-flex flex-col items-start w-auto">
                                                <label
                                                    className="mb-1 text-xs justify-start tracking-wide text-primary-text"
                                                    htmlFor="firstname"
                                                >
                                                    Firstname:
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full rounded-lg border border-gray-400 py-2 pl-4 pr-4 text-sm placeholder-gray-500 focus:outline-none"
                                                        id="firstname"
                                                        name="firstname"
                                                        value={updateUserProfile.firstname}
                                                        onChange={handleInputs}
                                                        type="text"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-5 inline-flex flex-col items-start">
                                                <label
                                                    className="mb-1 text-xs justify-start tracking-wide text-primary-text"
                                                    htmlFor="lastname"
                                                >
                                                    Lastname:
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        className="w-full rounded-lg border border-gray-400 py-2 pl-4 pr-4 text-sm placeholder-gray-500 focus:outline-none"
                                                        id="lastname"
                                                        name="lastname"
                                                        value={updateUserProfile.lastname}
                                                        onChange={handleInputs}
                                                        type="text"
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className='flex flex-row justify-around gap-2 px-4'>

                                            <div className="mb-5 inline-flex flex-col items-start w-full">
                                                <label
                                                    className="mb-1 text-xs justify-start tracking-wide text-primary-text"
                                                    htmlFor="email"
                                                >
                                                    Email:
                                                </label>
                                                <div className="relative w-full">
                                                    <input
                                                        className="w-full rounded-lg bg-white border border-gray-400 py-2 pl-4 pr-4 text-sm
                                                        cursor-not-allowed placeholder-gray-500 focus:outline-none"
                                                        id="email"
                                                        name="email"
                                                        value={getUser.email}
                                                        type="email"
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div className='flex flex-row items-center justify-between px-2'>
                                            <button className='flex w-fit items-center justify-center m-2 right-10 rounded-lg bg-primary-btn py-2 px-4 text-sm text-white 
                                                transition duration-150 ease-in hover:bg-primary-text focus:outline-none sm:text-base'
                                                type='submit'>
                                                Save Profile
                                            </button>
                                            <button className='flex w-fit items-center justify-center m-2 right-10 rounded-lg bg-red-700 py-2 px-4 text-sm text-white 
                                                transition duration-150 ease-in hover:bg-red-800 focus:outline-none sm:text-base'
                                                type='submit'>
                                                Delete
                                            </button>
                                        </div>
                                    </form>

                                    <span onClick={handleLogout} className="inline-flex items-center gap-1 text-gray-700 text-lg font-semibold cursor-pointer">
                                        <FaSignOutAlt className='w-7 h-7' /> <span>Logout</span>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Account