import React from 'react';
import './index.css'

interface PaginationProps{
    currentPage: number,
    onPageChange: (page: number) => void,
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, onPageChange }) => {
  const pages = [...Array(13).keys()].map(num => num + 1);

  return (
    <div className='pagination'>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;