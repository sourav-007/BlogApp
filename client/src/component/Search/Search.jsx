import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useBlog } from '../../context/BlogContext';
import { useNavigate } from 'react-router-dom';

function Search() {

    const { setQuery } = useBlog()
    const [searchQ, setSearchQ] = useState('')
    const navigate = useNavigate()

    const handleSearch = async (e) => {
        e.preventDefault();
        setQuery(searchQ)
        //navigate('/search');
        navigate(`/search?query=${encodeURIComponent(searchQ)}`);
    }
    //console.log('search component Q:', setQuery(searchQ))


    return (
        <>
            <form className="relative mx-auto flex max-w-[100%] mt-2 p-0 items-center justify-between rounded-2xl border shadow-lg 
            bg-white" onSubmit={handleSearch}>
                <FaSearch className="absolute left-4 block h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    //name="search"
                    className="h-14 w-full rounded-2xl py-4 pr-40 pl-12 outline-none focus:ring-1 ring-special bg-white text-primary-text"
                    placeholder="Search blogs by title, category, or tags..."
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                />
                
                <button
                    type="submit"
                    className="absolute right-0 mr-2 inline-flex h-11 items-center justify-center rounded-xl bg-primary-btn px-10 
                    font-medium font-sans text-white hover:bg-[#2B2D42] "
                >
                    Search
                </button>
            </form>
            
        </>
    )
}

export default Search