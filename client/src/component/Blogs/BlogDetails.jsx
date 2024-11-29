import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { FaEllipsis, FaFacebookF, FaInstagram, FaRegEye, FaXTwitter } from 'react-icons/fa6';
import { tagColorMapping } from '../utils/colorMap';
import useOutsideClick from '../utils/useOutsideClick';
import { useComment } from '../../context/CommentContext';
import default_avatar from '../../assets/img/user.png'
import { useAuth } from '../../context/AuthContext';
import { FaRegEdit } from 'react-icons/fa';



function BlogDetails() {

    const { selectedPost, getPostById } = useBlog();
    const { comments, getComments, createComment, updateComment, deleteComment } = useComment();
    const { getUser } = useAuth()
    const { id } = useParams();
    const [content, setContent] = useState('')
    const [editContent, setEditContent] = useState('');
    const [isEdit, setIsEdit] = useState(null)
    const [commentMenu, setCommentMenu] = useState(null)
    const commentMenuRef = useRef(null)
    const navigate = useNavigate()

    useOutsideClick(commentMenuRef, () => setCommentMenu(null))

    console.log(" details id", id);

    useEffect(() => {
        getPostById(id);
        window.scrollTo(0, 0)
    }, [getPostById, id]);

    useEffect(() => {
        getComments(id);
    }, [id, getComments]);


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await createComment(id, content)
            setContent('')
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdate = async (e, commentId) => {
        e.preventDefault()
        try {
            await updateComment(id, commentId, editContent)
            setIsEdit(null)
            setEditContent('');
            getComments(id)
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (commentId) => {
        try {
            await deleteComment(id, commentId)
        } catch (error) {
            console.error(error);
        }
    }


    const formatViews = (views) => {
        if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'k';
        }
        return views?.toString();
    };


    const tagKeys = Object.keys(tagColorMapping);


    return (
        <section className="container mx-auto relative mt-32 mb-5 p-20 w-[80%] rounded-xl bg-white">

            <div className="mb-1 w-full items-center justify-between sm:flex ">
                <strong>
                    <h1 className="mb-1 max-w-fit text-[3em] font-bold font-serif capitalize leading-snug text-gray-700 sm:mb-0">
                        {selectedPost?.title}
                    </h1>
                </strong>
            </div>

            <div className="mb-1 max-w-xl truncate text-sm font-bold leading-snug text-gray-500 sm:mb-0">
                <h3>By <span className='text-gray-500'>{selectedPost?.author.authorname}</span></h3>
            </div>

            <div className='flex justify-between'>
                <div className="mb-3 max-w-8xl flex flex-row items-center gap-1 ">
                    <div className="mb-1 max-w-xl truncate text-sm font-bold leading-snug text-gray-500 sm:mb-0">
                        <h3>Published on <span className='text-gray-500'>
                            {selectedPost?.created_at
                                ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit' }).format(new Date(selectedPost.created_at))
                                : 'Date not available'}
                        </span>
                        </h3>
                    </div>
                    <span className='text-gray-600 pb-1'>|</span>
                    <div className='flex items-center gap-1 text-gray-500 font-bold'>
                        <FaRegEye /> <span>{formatViews(selectedPost?.views)}</span>
                    </div>
                </div>

                {
                    getUser?.role === 'admin' && (
                        <div className='flex items-center justify-center text-gray-500 font-bold'>
                            <FaRegEdit className='w-6 h-6 cursor-pointer hover:scale-110'
                                onClick={() => navigate(`/edit-blog/blogs/${id}`)} />
                        </div>
                    )
                }
            </div>

            <div className="mb-5 w-full items-center justify-between sm:flex ">
                <img
                    src={selectedPost?.coverImage}
                    alt={selectedPost?.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl w-full border-2 border-slate-50 shadow"
                />
            </div>


            <div className="flex items-end justify-between mb-0 w-full max-h-fit whitespace-normal">
                <div className="w-full px-4 min-h-20 max-h-full text-gray-500 ">
                    <p className="mb-2 leading-normal text-lg first-letter:text-6xl first-letter:font-bold
                             first-letter:text-gray-600 first-letter:me-2 first-letter:float-start text-start">
                        {selectedPost?.content?.introduction}
                    </p>
                </div>
            </div>

            <div className="flex flex-col mb-0 w-full items-center justify-between scale-90 sm:flex">
                {
                    selectedPost?.bodyImage?.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt='bodyimage'
                            layout="fill"
                            objectFit="cover"
                            className="rounded-2xl w-auto h-auto object-cover scale-90 border-2 border-slate-50 shadow"
                        />
                    ))
                }
            </div>

            <div className="flex items-end justify-between mb-10 mt-2 w-full max-h-fit whitespace-normal">
                <div className="w-full px-4 min-h-20 max-h-full text-gray-500 ">
                    <p className="mb-2 leading-normal text-lg text-start">
                        {selectedPost?.content?.body}
                    </p>
                </div>
            </div>

            <div className="flex items-end justify-between w-full mb-10 max-h-fit whitespace-normal">
                <div className="w-full px-4 min-h-20 max-h-full text-gray-500 ">
                    <p className="mb-2 leading-normal text-lg text-start">
                        {selectedPost?.content?.conclusion}
                    </p>
                </div>
            </div>

            <div className='flex flex-row items-center justify-between px-4 mb-20 '>

                <div className='flex flex-row gap-3 py-2'>
                    {
                        selectedPost?.tags.map((tag, idx) => {
                            const { bg, text } = tagColorMapping[tagKeys[idx % tagKeys.length]]
                            return (
                                <div key={idx} class={`text-sm inline-flex items-center font-medium leading-sm px-3 py-1 ${bg} ${text} text-primary-text rounded-full`}>
                                    {tag}
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex flex-row gap-1 items-center">

                    <span className='text-primary-text text-base font-serif pr-2'>Share with</span>

                    <span className="size-8 inline-flex justify-center items-center font-bold rounded-full cursor-pointer text-base 
                            text-primary-btn bg-slate-200 transform transition duration-500 hover:bg-primary-btn hover:text-primary-btn-text">
                        <FaFacebookF className="shrink-0 size-4" />
                    </span>

                    <span className="size-8 inline-flex justify-center items-center font-bold rounded-full cursor-pointer text-base 
                            text-primary-btn bg-slate-200 transform transition duration-500 hover:bg-primary-btn hover:text-primary-btn-text">
                        <FaXTwitter className="shrink-0 size-4" />
                    </span>

                    <span className="size-8 inline-flex justify-center items-center font-bold rounded-full cursor-pointer text-base 
                            text-primary-btn bg-slate-200 transform transition duration-500 hover:bg-primary-btn hover:text-primary-btn-text">
                        <FaInstagram className="shrink-0 size-4" />
                    </span>

                </div>
            </div>

            <div className="bg-white antialiased">

                {
                    getUser?.role === 'admin' ? (
                        <div className="max-w-2xl px-4">
                            <div className="flex flex-row justify-normal items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-primary-text items-center">All comments({selectedPost?.commentsCount})</h2>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="max-w-2xl px-4">
                                <div className="flex flex-row justify-normal items-center mb-6">
                                    <h2 className="text-lg lg:text-2xl font-bold text-primary-text items-center">Leave a comment({selectedPost?.commentsCount})</h2>
                                </div>
                            </div>
                            <form className="mb-6 px-4" onSubmit={handleSubmit}>
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 shadow">
                                    <label for="comment" className="sr-only">Your comment</label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows="5"
                                        className="px-0 w-full text-lg text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                        placeholder={`Write a comment...`} required></textarea>
                                </div>
                                <button type="submit"
                                    className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-primary-btn rounded-lg ">
                                    Post comment
                                </button>
                            </form>
                        </>
                    )
                }


                {
                    comments.length > 0 && (
                        comments.map((comment) => (
                            <article key={comment._id} className="p-6 text-base bg-white rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-base text-primary-text font-semibold">
                                            <img
                                                className="mr-2 w-7 h-7 rounded-full"
                                                src={comment?.commentBy?.commentedUserAvatar ? comment?.commentBy?.commentedUserAvatar : default_avatar}
                                                alt={comment?.commentBy?.commentedUserName}
                                            />
                                            {comment?.commentBy?.commentedUserName}
                                        </p>
                                        <p className="text-xs text-primary-text flex items-center">
                                            {comment?.created_at
                                                ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(comment.created_at))
                                                : 'Date not available'}
                                        </p>
                                    </div>

                                    {
                                        (() => {
                                            console.log('Current User ID:', getUser?._id);
                                            console.log('Comment Author ID:', comment?.commentBy?.commentedUserId);
                                        })()
                                    }


                                    {
                                        ((comment?.commentBy?.commentedUserId === getUser?._id)) && (
                                            <div className="relative flex items-center" ref={commentMenuRef}>
                                                <button onClick={() => setCommentMenu(comment?._id)} className="text-gray-400 hover:text-gray-600">
                                                    <FaEllipsis className='h-5 w-5' />
                                                </button>
                                                {commentMenu === comment?._id && (
                                                    <div className="absolute right-0 z-10 mt-2 w-28 bg-white border border-gray-200 rounded shadow-lg">
                                                        <ul className="py-1">
                                                            {
                                                                comment?.commentBy?.commentedUserId === getUser?._id && (
                                                                    <>
                                                                        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-special hover:bg-opacity-10 cursor-pointer"
                                                                            onClick={() => {
                                                                                setIsEdit(comment?._id);
                                                                                setEditContent(comment?.content);
                                                                            }}>
                                                                            Edit
                                                                        </li>
                                                                        <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-special hover:bg-opacity-10 cursor-pointer"
                                                                            onClick={() => handleDelete(comment?._id)}>
                                                                            Delete
                                                                        </li>
                                                                    </>
                                                                )
                                                            }

                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                </div>
                                {isEdit === comment?._id ? (
                                    <form onSubmit={(e) => handleUpdate(e, comment?._id)} className='px-7'>
                                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 shadow">
                                            <textarea
                                                value={editContent}
                                                onChange={(e) => setEditContent(e.target.value)}
                                                rows="2"
                                                className="px-0 w-full text-lg text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                                placeholder={`Update your comment...`} required></textarea>
                                        </div>
                                        <div className='flex gap-2'>
                                            <button type="submit"
                                                className="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-primary-btn rounded-lg ">
                                                Update
                                            </button>
                                            <button type="button" onClick={() => setIsEdit(null)}
                                                className="inline-flex items-center py-1 px-2 text-sm font-medium text-center text-white bg-special-hover rounded-lg ">
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <p className="text-base text-gray-900 px-8">{comment?.content}</p>
                                )}

                            </article>
                        ))
                    )
                }

            </div>


        </section>

    )
}

export default BlogDetails