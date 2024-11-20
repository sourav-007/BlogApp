import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { FaTimes } from 'react-icons/fa';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { selectedPost, getPostById, updateBlog } = useBlog();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState({
        introduction: '',
        body: '',
        conclusion: '',
    });
    const [tags, setTags] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [bodyImages, setBodyImages] = useState([]);
    const [imageFile, setImageFile] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            console.log('Fetching post by ID:', id);
            await getPostById(id);
        };

        fetchPost();
    }, [getPostById, id]);

    useEffect(() => {
        if (selectedPost) {
            console.log('Selected post:', selectedPost);
            setTitle(selectedPost.title);
            setContent({
                introduction: selectedPost.content.introduction || '',
                body: selectedPost.content.body || '',
                conclusion: selectedPost.content.conclusion || ''
            });
            setTags(selectedPost.tags);
            setCoverImage(selectedPost.coverImage);
            setBodyImages(selectedPost.bodyImage);
        }
    }, [selectedPost]);

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(URL.createObjectURL(file));
            setImageFile(prevFiles => [...prevFiles, file]);
        }
    };

    const handleRemoveCoverImage = () => {
        setCoverImage(null);
    };

    const handleBodyImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        setBodyImages(prevImages => [...prevImages, ...urls]);
        setImageFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleRemoveBodyImage = (index) => {
        setBodyImages(prevImages => prevImages.filter((_, i) => i !== index));
        setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(tagInput)) {
                setTags([...tags, tagInput]);
                setTagInput('');
            }
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', {
            title,
            content,
            tags,
            coverImage,
            bodyImages,
        });

        const formData = new FormData();
        formData.append('title', title);
        if (content?.introduction) formData.append('content[introduction]', content.introduction);
        if (content?.body) formData.append('content[body]', content.body);
        if (content?.conclusion) formData.append('content[conclusion]', content.conclusion);
        tags.forEach(tag => formData.append('tags[]', tag));
        if (imageFile[0]) formData.append('coverImage', imageFile[0]);
        bodyImages.forEach((file, index) => {
            formData.append('bodyImage', imageFiles[index]);
        });
       
        
        console.log('FormData being sent:', [...formData.entries()]);

        try {
            await updateBlog(id, formData);
            navigate(`/blogs/${id}`);
        } catch (error) {
            console.error('Error updating blog:', error);
            setErrorMessage('Error updating blog. Please try again.');
        }
    };



    return (
        <section className="max-w-4xl mx-auto p-6 space-y-8 mt-32 mb-5 bg-slate-50 rounded-xl shadow">
            <h1 className="text-4xl font-bold font-mono text-center text-primary-text">Edit Blog Post</h1>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>

                <div className="space-y-2 mb-5">
                    <label className="block text-lg font-medium text-primary-text">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter post title..."
                        className="w-full px-3 py-3 border border-white rounded-xl shadow focus:outline-none focus:ring-primary-btn 
                        sm:text-sm focus:border-special"
                    />
                </div>

                <div className="space-y-2 mb-5">
                    <label className="block text-lg font-medium text-primary-text">Content:</label>

                    <div className='px-5 '>
                        <div className="space-y-2 mb-5">
                            <label className="block text-base font-medium text-primary-text">Introduction</label>
                            <textarea
                                name='introduction'
                                value={content.introduction}
                                // onChange={(e) => setContent({ ...content, [e.target.name]: e.target.value })}
                                onChange={(e) => {
                                    const updatedContent = { ...content, introduction: e.target.value };
                                    setContent(updatedContent);
                                }}
                                required
                                placeholder="Write your blog post introduction here..."
                                className="w-full px-3 py-2 border border-white rounded-xl shadow focus:outline-none focus:ring-primary-btn 
                                focus:border-special sm:text-sm min-h-[200px]"
                            />
                        </div>

                        <div className="space-y-2 mb-5">
                            <label className="block text-base font-medium text-primary-text">Main body</label>
                            <textarea
                                name='body'
                                value={content.body}
                                onChange={(e) => setContent({ ...content, body: e.target.value })}
                                required
                                placeholder="Write your blog post body here..."
                                className="w-full px-3 py-2 border border-white rounded-xl shadow focus:outline-none focus:ring-primary-btn 
                                focus:border-special sm:text-sm min-h-[200px]"
                            />
                        </div>

                        <div className="space-y-2 mb-5">
                            <label className="block text-base font-medium text-primary-text">Conclusion</label>
                            <textarea
                                name='conclusion'
                                value={content.conclusion}
                                onChange={(e) => setContent({ ...content, conclusion: e.target.value })}
                                required
                                placeholder="Write your blog post conclusion here..."
                                className="w-full px-3 py-2 border border-white rounded-xl shadow focus:outline-none focus:ring-primary-btn 
                                focus:border-special sm:text-sm min-h-[200px]"
                            />
                        </div>
                    </div>

                </div>

                <div className="space-y-2 mb-5">
                    <label className="block text-lg font-medium text-primary-text mb-2">Cover Image</label>
                    <input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className="w-full border border-gray-300 rounded-md p-2 hidden"
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('coverImage').click()}
                        className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-solid border-[#fff3] 
                        bg-special-hover px-2 py-1 pr-4 font-semibold leading-none text-white"
                    >
                        <span>
                            <svg
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                                <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
                                <path d="M9 15l3 -3l3 3"></path>
                                <path d="M12 12l0 9"></path>
                            </svg>
                        </span>
                        <span className="">Upload</span>
                    </button>
                    {coverImage && (
                        <div className="mt-4 flex justify-start">
                            <div className="flex justify-end relative">
                                <img
                                    src={coverImage}
                                    alt="Cover Preview"
                                    className="h-28 w-28 rounded-md object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveCoverImage}
                                    className="absolute text-red-600"
                                >
                                    <FaTimes className='w-6 h-6' />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2 mb-5">
                    <label className="block text-lg font-medium text-primary-text mb-2">Body Image</label>
                    <input
                        id="bodyImage"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleBodyImagesChange}
                        className="w-full border border-gray-300 rounded-md p-2 hidden"
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('bodyImage').click()}
                        className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md border border-solid border-[#fff3] 
                        bg-special-hover px-2 py-1 pr-4 font-semibold leading-none text-white"
                    >
                        <span>
                            <svg
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                height="24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                                <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
                                <path d="M9 15l3 -3l3 3"></path>
                                <path d="M12 12l0 9"></path>
                            </svg>
                        </span>
                        <span className="">Upload</span>
                    </button>
                    {bodyImages.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                            {bodyImages.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={preview}
                                        alt={`Body Preview ${index + 1}`}
                                        className="h-28 w-28 rounded-md object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveBodyImage(index)}
                                        className="absolute top-0 right-0 text-red-600"
                                    >
                                        <FaTimes className='w-6 h-6' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-2 mb-10">
                    <label htmlFor="tags" className="block text-lg font-medium text-primary-text">Tags</label>

                    <div className='flex flex-row gap-4'>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={handleTagInputChange}
                            onKeyDown={handleAddTag}
                            placeholder="Press Enter to add tag"
                            className="flex-1 max-w-fit px-3 py-2 border border-white rounded-xl shadow focus:outline-none focus:border-special sm:text-sm"
                        />
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full flex items-center">
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 text-red-500"
                                    >
                                        <FaTimes />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='flex justify-center gap-3'>
                    <button
                        type="submit"
                        className="w-fit px-4 py-2 text-lg font-semibold text-white bg-primary-btn rounded-xl shadow focus:outline-none"
                    >
                        Update Post
                    </button>

                    <button
                        type="button"
                        className="w-fit px-4 py-2 text-lg font-semibold text-white bg-primary-btn rounded-xl shadow focus:outline-none"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditBlog;
