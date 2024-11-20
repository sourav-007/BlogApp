import React, { useRef, useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { FaAngleDown } from 'react-icons/fa6';
import useOutsideClick from '../utils/useOutsideClick';
import { FaTimes } from 'react-icons/fa';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState({ introduction: '', body: '', conclusion: '' });
    const [category, setCategory] = useState("Select Category");
    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [coverImagePrev, setCoverImagePrev] = useState(null);
    const [bodyImages, setBodyImages] = useState([]);
    const [bodyImagePrev, setBodyImagePrev] = useState([]);
    const dropdownRef = useRef(null)
    const { createBlog } = useBlog()

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
            setCoverImagePrev(URL.createObjectURL(file))
        }
    };
    const handleRemoveCoverImage = () => {
        setCoverImage(null);
        setCoverImagePrev(null);
    };

    const handleBodyImagesChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setBodyImages(prevImages => [...prevImages, ...fileArray]);
            setBodyImagePrev(prevPreviews => [
                ...prevPreviews,
                ...fileArray.map(file => URL.createObjectURL(file))
            ]);
        }
    };
    const handleRemoveBodyImage = (index) => {
        const updatedImages = bodyImages.filter((_, i) => i !== index);
        const updatedPreviews = bodyImagePrev.filter((_, i) => i !== index);
        setBodyImages(updatedImages);
        setBodyImagePrev(updatedPreviews);
    };

    const toggleDropdown = () => { setIsOptionVisible(!isOptionVisible) };

    useOutsideClick(dropdownRef, () => setIsOptionVisible(false))

    const closeDropdown = (option) => {
        setCategory(option);
        setIsOptionVisible(false);
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

    const handleInputs = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setContent(prevContent => ({ ...prevContent, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content[introduction]', content.introduction);
        formData.append('content[body]', content.body);
        formData.append('content[conclusion]', content.conclusion);
        console.log('Content before stringifying:', content);
        formData.append('category', category);
        tags.forEach(tag => formData.append('tags[]', tag));
        formData.append('coverImage', coverImage);

        bodyImages.forEach((file) => {
            formData.append('bodyImage', file);
        });

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            await createBlog(formData);

            setTitle('');
            setContent({ introduction: '', body: '', conclusion: '' });
            setCategory("Select Category");
            setTags([]);
            setCoverImage(null);
            setCoverImagePrev(null);
            setBodyImages([]);
            setBodyImagePrev([]);
        } catch (error) {
            console.error(error);

        }


    };

    return (
        <section className="max-w-4xl mx-auto p-6 space-y-8 mt-32 mb-5 bg-slate-50 rounded-xl shadow">
            <h1 className="text-4xl font-bold font-mono text-center text-primary-text">Create New Blog Post</h1>

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
                                onChange={handleInputs}
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
                                onChange={handleInputs}
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
                                onChange={handleInputs}
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
                        required
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
                    {coverImagePrev && (
                        <div className="mt-4 flex justify-start">
                            <div className="flex justify-end relative">
                                <img
                                    src={coverImagePrev}
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
                        // required
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
                    {bodyImagePrev.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                            {bodyImagePrev.map((preview, index) => (
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

                <div className='flex flex-col justify-start gap-2 space-y-2 mb-5 relative'>
                    <label className="block text-lg font-medium text-primary-text">Category</label>
                    <button
                        type="button"
                        name='category'
                        className="flex flex-row items-center justify-between w-48 px-2 py-2 text-primary-text bg-white border-[1px] border-white 
                        rounded-xl shadow focus:outline-none focus:border-special"
                        onClick={toggleDropdown}
                    >
                        <span className="select-none">{category}</span>
                        <FaAngleDown className='text-primary-text' />
                    </button>

                    {isOptionVisible && (
                        <div
                            className="absolute z-10 top-full mt-2 w-48 py-2 bg-white rounded-xl shadow-xl cursor-pointer"
                            ref={dropdownRef}
                        >
                            <div className="block px-4 py-2 text-primary-text hover:bg-special hover:bg-opacity-10"
                                onClick={() => closeDropdown("Select Category")}
                            >
                                Select Category
                            </div>
                            <div className="block px-4 py-2 text-primary-text hover:bg-special hover:bg-opacity-10"
                                onClick={() => closeDropdown("sports")}
                            >
                                sports
                            </div>
                            <div className="block px-4 py-2 text-primary-text hover:bg-special hover:bg-opacity-10"
                                onClick={() => closeDropdown("health")}
                            >
                                health
                            </div>
                            <div className="block px-4 py-2 text-primary-text hover:bg-special hover:bg-opacity-10"
                                onClick={() => closeDropdown("business")}
                            >
                                business
                            </div>
                            <div className="block px-4 py-2 text-primary-text hover:bg-special hover:bg-opacity-10"
                                onClick={() => closeDropdown("tech")}
                            >
                                tech
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-2 mb-10">
                    <label htmlFor="tags" className="block text-lg font-medium text-primary-text">Tags</label>

                    <div className='flex flex-row gap-4'>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder="Press Enter to add tag"
                            className="flex-1 max-w-fit px-3 py-3 border border-white rounded-xl shadow focus:outline-none focus:border-special sm:text-sm"
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


                <div className='flex justify-center'>
                    <button
                        type="submit"
                        className="w-fit px-4 py-2 text-lg font-semibold text-white bg-primary-btn rounded-xl shadow focus:outline-none"
                    >
                        Create Post
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CreateBlog;