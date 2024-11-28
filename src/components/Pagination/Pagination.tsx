import { Button } from '@components/Button';
import { t } from '@lib/i18n';
import './Pagination.css';
import clsx from 'clsx';

interface PaginationProps {
  url: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  url,
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

  const generatePageUrl = (page: number) => {
    const newUrl = new URL(url);
    newUrl.searchParams.set('page', page.toString());
    return newUrl.toString();
  };

  const renderPageLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          as="a"
          level="secondary"
          variant="large"
          key={i}
          href={generatePageUrl(i)}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
            handlePageChange(e, i)
          }
          className={clsx({
            'pagination__page--active': i === currentPage,
          })}
        >
          {i}
        </Button>,
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Button
          as="a"
          level="secondary"
          variant="large"
          href={generatePageUrl(currentPage - 1)}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
            handlePageChange(e, currentPage - 1)
          }
        >
          {t('previous')}
        </Button>
      )}
      <div className="pagination__pages">{renderPageLinks()}</div>
      {currentPage < totalPages && (
        <Button
          as="a"
          level="secondary"
          variant="large"
          href={generatePageUrl(currentPage + 1)}
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
            handlePageChange(e, currentPage + 1)
          }
        >
          {t('next')}
        </Button>
      )}
    </div>
  );
};
