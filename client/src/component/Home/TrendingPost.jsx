import React, { useEffect } from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';
import { tagColorMapping } from '../utils/colorMap';

function TrendingPost() {
    const { isLoggedIn } = useAuth();
    const { getTrendingPost, trendingPost } = useBlog();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching trending posts...");
        getTrendingPost();
    }, [getTrendingPost]);

    const tagKeys = Object.keys(tagColorMapping);

    return (
        <section className='container flex flex-col gap-6 px-0 py-4 md:px-5 bg-slate-50 rounded-sm group'>
            {trendingPost && trendingPost?.length > 0 ? (
                trendingPost.map((post) => (
                    <div key={post?._id} className='flex flex-col lg:flex-row md:flex-col gap-4 lg:gap-8 bg-white p-2 rounded-lg shadow-md w-full'>

                        {/* Image Section */}
                        <div className='lg:w-1/2 md:w-full sm:w-full flex justify-center'>
                            <img
                                src={post?.image || post?.coverImage}
                                alt="Featured Post"
                                className='object-cover w-full h-60 lg:h-[300px] rounded-md'
                            />
                        </div>

                        {/* Text Content */}
                        <div className='flex flex-1 flex-col gap-4 justify-between'>

                            {/* Trending Title */}
                            <div className='flex flex-col'>
                                <div className='flex items-center gap-2'>
                                    <FaArrowTrendUp className='text-red-700' />
                                    <h1 className='animate-blink font-semibold'>Trending</h1>
                                </div>
                                <h1 className='mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-primary-text leading-tight'>
                                    {post?.title}
                                </h1>
                                <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-500">
                                    {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(post?.created_at))}
                                </p>
                            </div>

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

                            

                            <button onClick={() => navigate(`/blogs/${post?._id}`)} disabled={!isLoggedIn}
                                className={`flex items-center gap-1 w-fit mt-2 text-primary-text text-base font-semibold group cursor-pointer`}>
                                <span className="flex items-center text-lg transform -translate-x-0 opacity-0 transition-all duration-300 ease-in-out 
                                    group-hover:translate-x-0 group-hover:opacity-100">
                                    Read more...
                                </span>
                                <FaAngleDoubleRight className="w-5 h-5 transform -translate-x-[6.6rem] opacity-100 transition-all duration-300 ease-in-out 
                                    group-hover:translate-x-0 group-hover:opacity-100" />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-500">No trending posts available.</p>
            )}
        </section>
    );
}

export default TrendingPost;
