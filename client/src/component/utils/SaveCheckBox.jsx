import React, { useEffect, useState } from 'react';
import { useFavorite } from '../../context/FavoriteContext';

function SaveCheckBox({ className, blogId }) {
    const { savedPost, unsavedPost, favoriteList } = useFavorite();
    const [isChecked, setIsChecked] = useState(false);

    // Initialize the checked state based on localStorage or favoriteList
    useEffect(() => {
        const savedLocalFavorites = JSON.parse(localStorage.getItem('favoriteBlogs')) || [];
        const isFavorited = savedLocalFavorites.includes(blogId) || favoriteList?.some(fav => fav._id === blogId);
        setIsChecked(isFavorited);
    }, [favoriteList, blogId]);

    const handleToggle = async () => {
        try {
            const updatedFavorites = JSON.parse(localStorage.getItem('favoriteBlogs')) || [];

            if (!isChecked) {
                // Call API to save the post
                await savedPost(blogId);
                // Update localStorage
                updatedFavorites.push(blogId);
                setIsChecked(true); // Update state
            } else {
                // Call API to unsave the post
                await unsavedPost(blogId);
                // Update localStorage
                const index = updatedFavorites.indexOf(blogId);
                if (index > -1) {
                    updatedFavorites.splice(index, 1);
                }
                setIsChecked(false); // Update state
            }

            // Finally, update localStorage
            localStorage.setItem('favoriteBlogs', JSON.stringify(updatedFavorites));
        } catch (error) {
            console.error("Save blog error", error.message);
        }
    };

    return (
        <div onClick={handleToggle} className={`cursor-pointer hover:scale-110 ${className}`}>
            {/* Heart Icon */}
            <svg
                className={`w-full h-full transition-all duration-300 ease-in-out
                    ${isChecked ? 'text-red-600 scale-110' : 'text-transparent scale-100'}
                    group-hover:scale-105`}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
            >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            {/* Background effect for unchecked state */}
            <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out text-red-700
                ${isChecked ? 'opacity-0' : 'opacity-100'}`}>
                <svg
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </div>
        </div>
    );
}

export default SaveCheckBox;
