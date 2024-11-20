import React, { useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { tagColorMapping } from '../utils/colorMap';
import { FaTrashCan } from 'react-icons/fa6';
import Pagination from '../utils/Pagination';


function Dash() {

    const { posts, deleteBlog, currentPage, setCurrentPage, totalPages } = useBlog()
    const navigate = useNavigate()
    const tagKeys = Object.keys(tagColorMapping);

    const [itemToDelete, setItemToDelete] = useState(null);

    const confirmDelete = async (id) => {
        try {
            await deleteBlog(id)
            setItemToDelete(null);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <section className="container mx-auto mt-32 px-4 py-8 border-2 border-solid border-red-700">

            <div className="flex items-center justify-end mb-10">
                <button
                    class="font-sans flex justify-center gap-2 items-center shadow-xl text-lg text-gray-50 bg-primary-btn backdrop-blur-md 
                    lg:font-semibold isolation-auto before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full 
                    before:hover:left-0 before:rounded-full before:bg-special-hover hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 
                    before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                    type="button"
                    onClick={() => navigate('/dashboard/create-blog')}
                >
                    Create Blog
                    <span class="group cursor-pointer outline-none group-hover:rotate-180 duration-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            class="stroke-white w-8 h-8 fill-none group-active:stroke-green-200 group-active:fill-green-600 
                        group-active:duration-0 duration-300"
                        >
                            <path
                                d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                stroke-width="1.5"
                            ></path>
                            <path d="M8 12H16" stroke-width="1.5"></path>
                            <path d="M12 16V8" stroke-width="1.5"></path>
                        </svg>
                    </span>
                </button>
            </div>

            <div className="flex justify-center items-center mb-10">
                <h2 className="text-primary-text text-5xl font-bold font-mono">Entertainment</h2>
            </div>

            {
                posts && posts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        {posts.map((post, index) => (
                            <div key={index} className={`flex flex-col h-full relative rounded-xl group transform transition-transform duration-500 
                            hover:scale-105`}
                            >
                                <div className="rounded-t-2xl">
                                    <div className="relative">
                                        {
                                            post?.coverImage ? (
                                                <img
                                                    src={post?.coverImage}
                                                    alt={post?.title}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-t-xl sm:h-40 md:h-32 lg:h-44 xl:h-48 2xl:h-56 w-full"
                                                />
                                            ) : (
                                                <div class="w-full animate-pulse rounded shadow ">
                                                    <div class="flex items-center justify-center sm:h-40 md:h-32 lg:h-44 xl:h-48 2xl:h-56 rounded-t-xl bg-gray-400 ">
                                                        <svg class="h-10 w-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                                            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                                        </svg>
                                                    </div>
                                                </div>

                                            )
                                        }
                                    </div>
                                </div>
                                <div className="flex-grow p-2 bg-slate-50 rounded-b-xl">
                                    <p className="text-sm text-muted-foreground text-gray-700 mb-2">
                                        {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(post?.created_at))}
                                    </p>
                                    <h3 className="text-xl font-semibold text-primary-text mb-2">{post?.title?.slice(0, 73) + '...'}</h3>
                                    <p className="text-muted-foreground text-gray-700 text-justify mb-2">{post?.content?.introduction?.slice(0, 145) + '.....'}</p>

                                    <div className='flex flex-row gap-3 py-2'>
                                        {
                                            post?.tags?.map((tag, idx) => {
                                                const { bg, text } = tagColorMapping[tagKeys[idx % tagKeys.length]]
                                                return (
                                                    <div key={idx} class={`text-xs inline-flex items-center font-medium leading-sm px-3 py-1 ${bg} ${text} text-primary-text rounded-full`}>
                                                        {tag}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='flex flex-row items-center justify-between'>
                                        <Link to={`/blogs/${post?._id}`} className={`flex items-center gap-1 w-fit text-primary-text text-lg font-semibold group cursor-pointer`}>
                                            <span className="flex items-center transform -translate-x-0 opacity-0 transition-all duration-300 ease-in-out 
                                            group-hover:translate-x-0 group-hover:opacity-100">
                                                Read more...
                                            </span>
                                            <FaAngleDoubleRight className="w-5 h-5 transform -translate-x-28 opacity-100 transition-all duration-300 ease-in-out 
                                            group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>

                                        <FaTrashCan className='w-5 h-5 mr-2 text-primary-btn hover:text-red-600 hover:scale-110 cursor-pointer'
                                            onClick={() => setItemToDelete(post?._id)} />
                                    </div>

                                    {itemToDelete === post?._id && (
                                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 rounded-xl shadow">
                                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                                                <div className='flex flex-col'>
                                                    <div className="font-bold">Confirm Deletion</div>
                                                    <div>
                                                        Are you sure you want to delete <strong>{post?.title}</strong>?
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex justify-end gap-2">
                                                    <button
                                                        className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-solid border-[#fff3] 
                                                        bg-special hover:bg-special-hover p-2 font-semibold leading-none text-white"
                                                        onClick={() => setItemToDelete(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-solid border-[#fff3] 
                                                        bg-red-600 hover:bg-red-700 p-2 font-semibold leading-none text-white"
                                                        onClick={() => confirmDelete(post?._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                )
            }

            <div className="flex justify-center items-center mt-8">
                <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </div>
        </section>
    )
}

export default Dash