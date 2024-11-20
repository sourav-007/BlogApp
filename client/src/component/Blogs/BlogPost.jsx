import React from 'react'
import { FaRegHeart, FaChevronCircleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import Unauthorized from '../utils/Unauthorized';
import { useAuth } from '../../context/AuthContext';


function BlogPost() {

    const { posts } = useBlog();
    const { isLoggedIn } = useAuth();
    console.log(isLoggedIn);


    return (
        <>

            <div className="grid grid-cols-1 p-3 gap-2 mt-24">
                {isLoggedIn ? (
                    posts.length > 0 ? (
                        posts.map((post) => (
                            <section key={post._id} className="flex flex-col justify-center p-3 text-gray-600 antialiased rounded-md ">
                                <div className="h-full ">
                                    <div className="mx-auto max-w-4xl rounded-lg bg-white shadow-lg border-2 border-solid border-gray-100">
                                        <div className="px-0 py-0">
                                            <div className="flex items-start rounded-md">
                                                <div className="flex-grow truncate px-5 py-5">
                                                    <div className="mb-1 w-full h-fit items-center justify-between sm:flex ">
                                                        <h1 className="mb-1 max-w-4xl whitespace-normal truncate text-[2em] font-extrabold font-serif leading-snug text-gray-700 sm:mb-0">
                                                            {post.title}
                                                        </h1>
                                                        <div className="flex flex-shrink-0 items-center space-x-3 sm:ml-2">
                                                            <button className="group flex items-center text-left text-sm 
                                                            font-medium text-red-600 hover:text-gray-500 focus:outline-none focus-visible:border-b focus-visible:border-blue-950">
                                                                <FaRegHeart className="mr-2 h-5 w-5 font-black flex-shrink-0 duration-300 fill-current text-red-600 hover:text-red-800" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 max-w-4xl items-center justify-between flex flex-row ">
                                                        <div className="mb-1 max-w-xl truncate text-sm font-extrabold 
                                                            leading-snug text-gray-700 sm:mb-0">
                                                            <h3>Author : <span className='text-gray-500'>{post.author.authorname}</span></h3>
                                                        </div>
                                                        <div className="mb-1 max-w-xl truncate text-sm font-extrabold 
                                                            leading-snug text-gray-700 sm:mb-0">
                                                            <h3>Date : <span className='text-gray-500'>{new Date(post.created_at).toLocaleDateString()}</span></h3>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-end justify-between whitespace-normal">
                                                        <div className="max-w-4xl min-h-20 max-h-36 text-gray-500 text-justify">
                                                            <p className="mb-2">
                                                                {post.content.slice(0, 500)}
                                                                <Link to={`/blogs/${post._id}`}>
                                                                    <strong className='text-xl'>....Read more <span className='text-2xl'>👈</span> </strong>                                                            </Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ))
                    ) : (
                        <div className='flex items-center justify-center'>
                            <h1 className="text-blue-700 hover:text-blue-900 flex items-center gap-2 font-medium text-[2em] py-2 px-4 font-mono">
                                <FaChevronCircleRight />No posts available...
                            </h1>
                        </div>
                    )
                ) : (
                    <Unauthorized />
                )}


            </div>

        </>
    )
}

export default BlogPost

