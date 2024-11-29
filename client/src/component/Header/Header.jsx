import React, { useEffect, useRef, useState } from 'react'
import { FaSearch, FaBars, FaTimes, FaRegHeart, FaBloggerB, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useOutsideClick from '../utils/useOutsideClick';
import default_avatar from '../../assets/img/user.png'
import Search from '../Search/Search';


function Header() {

    const { logout, getUser, isLoggedIn, } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const menuRef = useRef(null)
    const profileRef = useRef(null)
    const searchRef = useRef(null);

    const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) }
    const toggleSearch = () => { setIsSearchOpen(!isSearchOpen) }
    const toggleProfile = () => { setIsProfileOpen(!isProfileOpen) }

    useOutsideClick(menuRef, () => setIsMenuOpen(false));
    useOutsideClick(searchRef, () => setIsSearchOpen(false));
    useOutsideClick(profileRef, () => setIsProfileOpen(false));

    const handleLogout = async () => {

        try {
            await logout()
            setIsProfileOpen(false)
        } catch (error) {
            console.log(error)
        }
    }

    const location = useLocation();
    const navigate = useNavigate()

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])


    return (
        <>
            <nav className={`max-w-[95%] mx-auto rounded-3xl fixed top-0 left-0 right-0 z-50 sm:px-5 transition-all duration-300 bg-gray-300 bg-opacity-[30%] drop-shadow-lg 
                 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-white hover:bg-white"} group`}>

                <div className="container mx-auto h-28 flex flex-wrap items-center justify-between">
                    <Link to="/" className="flex items-center text-primary-text 2xl:text-5xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-2xl font-bold font-mono ">
                        <FaBloggerB className='text-special' />logApp
                    </Link>

                    <div className="hidden lg:flex md:flex flex-grow items-center justify-center" id="navbar-default">

                        <ul className={`flex flex-col lg:flex-row lg:space-x-8 md:flex-row md:space-x-8 md:mt-0 lg:mt-0 font-medium`}>


                            {
                                getUser?.role === 'admin' ? (
                                    <li>
                                        <Link to="/dashboard" className={`block py-2 text-lg hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                            ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/dashboard' ? `text-special-hover scale-105` : ``}`
                                            : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                            }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/sports" className={`block py-2 xl:text-xl lg:text-lg md:text-sm hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                                ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/sports' ? `text-special-hover scale-105` : ``}`
                                                : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                                }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                            >
                                                Sport
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/health" className={`block py-2 xl:text-xl lg:text-lg md:text-sm hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                                ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/health' ? `text-special-hover scale-105` : ``}`
                                                : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                                }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                            >
                                                Health
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/business" className={`block py-2 xl:text-xl lg:text-lg md:text-sm hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                                ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/business' ? `text-special-hover scale-105` : ``}`
                                                : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                                }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                            >
                                                Business
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/tech" className={`block py-2 xl:text-xl lg:text-lg md:text-sm hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                                ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/tech' ? `text-special-hover scale-105` : ``}`
                                                : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                                }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                            >
                                                Tech
                                            </Link>
                                        </li>
                                    </>
                                )
                            }

                        </ul>
                    </div>

                    <div className="hidden md:flex items-center space-x-6 text-primary-text">
                        <button className={`cursor-pointer hover:scale-105`}
                            onClick={toggleSearch} disabled={!isLoggedIn}
                        >
                            {!isSearchOpen ? <FaSearch className="lg:h-6 lg:w-6" /> : <FaTimes className="lg:h-6 lg:w-6" />}
                        </button>
                        {isLoggedIn ? (
                            <>
                                <FaRegHeart className="lg:h-7 lg:w-7 cursor-pointer hover:scale-105" onClick={() => navigate('/favorite')} />
                                <img className="w-16 h-16 text-xl text-primary-btn-text border-4 border-solid border-slate-200 group-hover:border-slate-100 rounded-full 
                                    flex items-center justify-center cursor-pointer object-center whitespace-normal hover:scale-105"
                                    onClick={toggleProfile}
                                    src={getUser.avatar || default_avatar}
                                    alt='avatar'
                                />
                            </>

                        ) : (
                            <>
                                <div className="border-l border-gray-600 h-6"></div>
                                <div className='bg-[#f6f9fc] group-hover:bg-[#f6f9fc] px-2 py-1 rounded-l-3xl rounded-r-3xl'>
                                    <button className=" lg:inline-block px-2 py-2 lg:text-base md:text-base sm:text-sm hover:scale-105"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </button>
                                    <button className=" lg:inline-block px-2 py-1 lg:text-base bg-white text-[#2B2D42] group-hover:bg-white 
                                    rounded-l-2xl rounded-r-2xl hover:scale-105"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        className="md:hidden"
                        onClick={() => {
                            toggleMenu();
                            if (isSearchOpen) {
                                setIsSearchOpen(false);
                            }
                        }}

                    >
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </div>

                {isMenuOpen && (
                    <div ref={menuRef} className="md:hidden flex flex-row items-center justify-center space-x-10">
                        <ul className='flex flex-row space-x-6 md:mt-0 lg:mt-0'>
                            <li>
                                <Link to="/political" className={`block py-2 text-lg hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                    ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/all-blogs' ? `text-special-hover scale-105` : ``}`
                                    : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                    }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                >
                                    All
                                </Link>
                            </li>
                            <li>
                                <Link to="/sports" className={`block py-2 text-lg hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                    ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/sports' ? `text-special-hover scale-105` : ``}`
                                    : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                    }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                >
                                    Sport
                                </Link>
                            </li>
                            <li>
                                <Link to="/health" className={`block py-2 text-lg hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                    ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/health' ? `text-special-hover scale-105` : ``}`
                                    : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                    }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                >
                                    Health
                                </Link>
                            </li>
                            <li>
                                <Link to="/business" className={`block py-2 text-lg hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                    ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/business' ? `text-special-hover scale-105` : ``}`
                                    : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                    }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                >
                                    Business
                                </Link>
                            </li>
                            <li>
                                <Link to="/tech" className={`block py-2 text-lg hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                    ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/tech' ? `text-special-hover scale-105` : ``}`
                                    : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                    }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                >
                                    Tech
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className={`block py-2 text-lg hover:text-gray-700 hover:scale-105 ${isLoggedIn
                                    ? `border-indigo-500 text-primary-text hover:text-special ${location.pathname === '/dashboard' ? `text-special-hover scale-105` : ``}`
                                    : 'border-transparent text-primary-text hover:text-primary-text cursor-not-allowed'
                                    }`} onClick={(e) => !isLoggedIn && e.preventDefault()}
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </ul>

                        <button className="cursor-pointer hover:scale-105" onClick={() => setIsSearchOpen(!isSearchOpen)} disabled={!isLoggedIn}>
                            {!isSearchOpen ? <FaSearch className="h-4 w-4" /> : <FaTimes className="h-4 w-4" />}
                        </button>
                        {isLoggedIn ? (
                            <>
                                <FaRegHeart className="h-4 w-4 cursor-pointer hover:scale-105" onClick={() => navigate('/favorite')} />
                                <img className="w-10 h-10 text-xl text-primary-btn-text border-[3px] border-solid border-slate-200 group-hover:border-slate-100 rounded-full 
                                    flex items-center justify-center cursor-pointer object-center whitespace-normal hover:scale-105"
                                    onClick={toggleProfile}
                                    src={getUser.avatar || default_avatar}
                                    alt='avatar'
                                />
                            </>
                        ) : (
                            <>
                                <div className='flex bg-[#f6f9fc] px-[0.3rem] py-1 rounded-l-2xl rounded-r-2xl'>
                                    <button className="px-1 py-1 text-sm hover:scale-105"
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </button>
                                    <button className="px-1 py-[0.1rem] text-sm bg-white text-[#2B2D42] rounded-xl hover:scale-105"
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div ref={searchRef} className={`absolute mx-auto left-0 right-0 bottom-0 sm:w-[80%] md:w-[70%] lg:w-[60%] transform 
                ${isSearchOpen ? 'translate-y-full opacity-100' : 'translate-y-0 opacity-0'} transition-all duration-200 ease-in-out 
                ${isSearchOpen ? '' : 'pointer-events-none'}`}
                >
                    
                    <Search />
                </div>


            </nav>

            {isLoggedIn && isProfileOpen && (
                <div className="fixed inset-0 flex items-start justify-end z-50">
                    <div className="absolute inset-0 opacity-95" onClick={toggleProfile}></div>
                    {/* bottom div(ref div) was absolute */}
                    <div ref={profileRef} className="fixed mx-auto mt-10 w-64 sm:right-[2rem] md:right-[1.3rem] lg:right-[1.5rem] sm:top-32 md:top-20 
                    rounded-lg bg-gray-100 shadow-lg border-[3px] border-solid border-special border-opacity-15">
                        <div className="px-0 pb-3">
                            <div className="my-0 text-center">
                                <div className='bg-special bg-opacity-15 p-2 mb-8 h-16 rounded-tr-[5px] rounded-tl-[5px]'></div>
                                <div className='absolute top-6 right-14 left-14'>
                                    <img className="mx-auto w-20 h-20 text-xl text-primary-btn-text border-4 border-solid rounded-full
                                    flex items-center justify-center object-center whitespace-normal"
                                        src={getUser.avatar || default_avatar}
                                        alt='avatar'
                                    />
                                </div>
                                <div className="flex flex-col px-2 py-2">
                                    <h3 className="mb-1 text-2xl font-semibold text-primary-text "> {'Hi, ' + getUser.firstname + '!'} </h3>
                                </div>
                                <div className='flex flex-col gap-2 pl-3'>
                                    <Link to='/profile' onClick={toggleProfile} className="inline-flex items-center gap-3 text-gray-700  cursor-pointer">
                                        <FaUser className='w-5 h-5' /> <span>Account</span>
                                    </Link>
                                    <Link to='/forgot-password' onClick={toggleProfile} className="inline-flex items-center gap-3 text-gray-700  cursor-pointer">
                                        <FaCog className='w-5 h-5' /> <span>Change Password</span>
                                    </Link>
                                    <span onClick={handleLogout} className="inline-flex items-center gap-3 text-gray-700 cursor-pointer">
                                        <FaSignOutAlt className='w-[1.3rem] h-[1.3rem]' /> <span>Logout</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </>
    )
}

export default Header