import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);
  let startPage, endPage;

  // Calcular el rango de páginas a mostrar
  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= halfPagesToShow) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + halfPagesToShow >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPagesToShow;
      endPage = currentPage + halfPagesToShow;
    }
  }

  // Generar los botones de paginación
  const pageButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <li
        key={i}
        className={`page-item ${i === currentPage ? 'active' : ''}`}
        onClick={() => onPageChange(i)}
      >
        <span className="page-link">{i}</span>
      </li>
    );
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {startPage > 1 && (
          <>
            <li className="page-item" onClick={() => onPageChange(1)}>
              <span className="page-link">1</span>
            </li>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          </>
        )}

        {pageButtons}

        {endPage < totalPages && (
          <>
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
            <li className="page-item" onClick={() => onPageChange(totalPages)}>
              <span className="page-link">{totalPages}</span>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
