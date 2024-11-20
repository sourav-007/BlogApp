import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
    const getPages = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Render pagination only if there are more than one page
    if (totalPages <= 1) {
        return null; // Do not render anything if there is only one page
    }

    return (
        <div aria-label="Pagination" className="flex items-center justify-center text-gray-600 mt-4">

            <button
                onClick={handlePrev}
                className={`p-2 mr-4 rounded text-primary-text ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}`}
                disabled={currentPage === 1}
            >
                <FaChevronLeft className='w-5 h-5' />
            </button>


            {getPages().map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 mx-1 rounded-full ${
                        currentPage === page ? 'bg-primary-btn text-primary-btn-text font-medium' : 'hover:bg-special hover:bg-opacity-15'
                    }`}
                >
                    {page}
                </button>
            ))}


            <button
                onClick={handleNext}
                className={`p-2 ml-4 rounded text-primary-text ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'}`}
                disabled={currentPage === totalPages}
            >
                <FaChevronRight className='w-5 h-5' />
            </button>
        </div>
    );
};

export default Pagination;
