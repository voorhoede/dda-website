interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (
    event: React.MouseEvent<HTMLAnchorElement>,
    page: number,
  ) => {
    event.preventDefault();
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <a href="#" onClick={(e) => handlePageChange(e, currentPage - 1)}>
        Previous
      </a>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <a href="#" onClick={(e) => handlePageChange(e, currentPage + 1)}>
        Next
      </a>
    </div>
  );
};
