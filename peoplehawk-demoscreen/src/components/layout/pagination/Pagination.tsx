import React from 'react';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PageButton>

      {Array.from({ length: totalPages }, (_, index) => (
        <PageButton
          key={index}
          onClick={() => handlePageChange(index + 1)}
          isActive={currentPage === index + 1}
        >
          {index + 1}
        </PageButton>
      ))}

      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

// Styled components
const PaginationContainer = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.5rem;
  margin-right : 40px;
`;

const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background: ${props => (props.isActive ? '#0097A2' : '#fff')};
  color: ${props => (props.isActive ? '#fff' : '#000')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  
  &:disabled {
    background: #e9ecef;
  }
`;

export default Pagination;
