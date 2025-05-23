// import React from 'react';
//
// function Pagination({ totalPages, currentPage, onPageChange }) {
//     if (totalPages === 1) return null;
//
//     return (
//         <div className="pagination">
//             {Array.from({ length: totalPages }, (_, i) => (
//                 <button
//                     key={i + 1}
//                     onClick={() => onPageChange(i + 1)}
//                     className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
//                 >
//                     {i + 1}
//                 </button>
//             ))}
//         </div>
//     );
// }
//
// export default Pagination;

import React from 'react';
import './Pagination.css';

function Pagination({ totalPages, currentPage, onPageChange }) {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    return (
        <div className="pagination-container">
            {getPageNumbers().map((page, index) => (
                <button
                    key={index}
                    className={`page-button ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                    onClick={() => typeof page === 'number' && onPageChange(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}

export default Pagination;