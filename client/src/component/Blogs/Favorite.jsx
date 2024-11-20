import React from 'react'
import { Link } from 'react-router-dom'
import SaveCheckBox from '../utils/SaveCheckBox'
import { useFavorite } from '../../context/FavoriteContext'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { tagColorMapping } from '../utils/colorMap'
import { useBlog } from '../../context/BlogContext'
import Pagination from '../utils/Pagination'


function Favorite() {

    const { favoriteList } = useFavorite()
    const { currentPage, setCurrentPage, totalPages, totalPosts, limit } = useBlog()

    const tagKeys = Object.keys(tagColorMapping);

    return (
        <section className="container mx-auto px-4 py-8 mt-32">

            {
                favoriteList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            favoriteList.map((post, index) => (
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
                                            <SaveCheckBox className='absolute right-3 top-3 w-6 h-6' blogId={post?._id} />
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

                                        <Link to={`/blogs/${post?._id}`} className={`flex items-center gap-1 w-fit text-primary-text text-lg font-semibold group cursor-pointer`}>
                                            <span className="flex items-center transform -translate-x-0 opacity-0 transition-all duration-300 ease-in-out 
                                            group-hover:translate-x-0 group-hover:opacity-100">
                                                Read more...
                                            </span>

                                            <FaAngleDoubleRight className="w-5 h-5 transform -translate-x-28 opacity-100 transition-all duration-300 ease-in-out 
                                        group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mx-auto h-[50vh] w-3/5 text-center">
                        <span className="font-bauhaus font-semibold leading-relaxed 2xl:text-7xl xl:text-5xl lg:text-5xl md:text-4xl sm:text-3xl text-primary-text">
                            You <span className='text-special'>favorites</span> list is waiting — start saving the posts you <span className='text-red-600'>love</span>!
                        </span>
                    </div>
                )
            }

            {
                totalPosts > limit && (
                    <div className="flex justify-center items-center mt-8">
                        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                    </div>
                )
            }

        </section>
    )
}

export default Favorite