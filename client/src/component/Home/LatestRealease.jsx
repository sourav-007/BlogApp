import React, { useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';


function LatestRealease() {

    const { isLoggedIn } = useAuth()
    const { latestPost, getLatestPosts } = useBlog()
    const navigate = useNavigate()

    useEffect(() => {
        getLatestPosts()
    }, [getLatestPosts])

    return (
        <section className="container mx-auto p-4">
            {/* <div className="flex justify-between items-center mb-10 px-1">
                <h1 className="text-primary-text text-4xl font-bold">Latest Release</h1>
                <button className="bg-primary-btn text-primary-btn-text flex items-center max-w-fit px-10 py-2 rounded-2xl">
                    View All
                </button>
            </div> */}
            <div className="flex justify-center items-center mb-10">
                <h2 className="text-primary-text text-5xl font-bold font-mono">Latest Release</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 p-4 bg-slate-50">
                {latestPost?.length > 0 ? (
                    <>
                        <div className="lg:col-span-3 relative group">
                            <span className="absolute -top-2 -left-3 bg-red-600 rounded-br-xl text-white font-bold w-6 h-6 flex items-center justify-center text-sm">
                                1
                            </span>
                            <img
                                src={latestPost[0]?.coverImage} 
                                alt={latestPost[0]?.title}
                                width={600}
                                height={400}
                                className="w-full h-64 object-cover"
                            />
                            <div className="relative pl-2 py-3 bg-white">
                                <p className="text-gray-500">
                                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(latestPost[0]?.created_at))}
                                </p>
                                <h3 className="text-xl font-semibold font-sans">{latestPost[0]?.title}</h3>
                                {/* <p className="text-muted-foreground text-gray-700 text-justify mb-2">{latestPost[0]?.content?.introduction?.slice(0, 145) + '.....'}</p> */}


                                <button onClick={() => navigate(`/blogs/${latestPost[0]?._id}`)} disabled={!isLoggedIn} className={`flex items-center gap-1 w-fit mt-2 text-primary-text text-base font-semibold group cursor-pointer`}>
                                    <span className="flex items-center transform -translate-x-0 opacity-0 transition-all duration-300 ease-in-out 
                                            group-hover:translate-x-0 group-hover:opacity-100">
                                        Read more...
                                    </span>

                                    <FaAngleDoubleRight className="w-4 h-4 transform -translate-x-[6.3rem] opacity-100 transition-all duration-300 ease-in-out 
                                            group-hover:translate-x-0 group-hover:opacity-100" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4 lg:col-span-2 relative">
                            {latestPost.slice(1).map((post, index) => (
                                <div key={post._id} className="flex bg-white p-2 shadow-md w-full group scale-95">
                                    <div className="flex-grow pl-4 relative">
                                        <span className="absolute -top-4 -left-4 bg-red-600 rounded-br-xl text-white font-bold w-6 h-6 flex items-center justify-center text-sm">
                                            {index + 2}
                                        </span>
                                        <p className="text-gray-500">
                                            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(post?.created_at))}
                                        </p>
                                        <h3 className="text-lg font-semibold font-sans">{post?.title}</h3>
                                        <button onClick={() => navigate(`/blogs/${post?._id}`)} disabled={!isLoggedIn} className={`flex items-center gap-1 w-fit mt-2 text-primary-text text-base font-semibold group cursor-pointer`}>
                                            <span className="flex items-center transform -translate-x-0 opacity-0 transition-all duration-300 ease-in-out 
                                            group-hover:translate-x-0 group-hover:opacity-100">
                                                Read more...
                                            </span>

                                            <FaAngleDoubleRight className="w-4 h-4 transform -translate-x-[6.3rem] opacity-100 transition-all duration-300 ease-in-out 
                                            group-hover:translate-x-0 group-hover:opacity-100" />
                                        </button>
                                    </div>
                                    <div className="flex-shrink-0 w-1/3">
                                        <img
                                            src={post?.coverImage}
                                            alt={post?.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <p>No latest posts available.</p>
                )}
            </div>
        </section>
    )
}

export default LatestRealease

