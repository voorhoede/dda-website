import { Button } from '@components/Button';
import { t } from '@lib/i18n';
import clsx from 'clsx';
import './Pagination.css';

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
    const maxPagesToShow = 5; // Maximum number of page links to show
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    let endPage = Math.min(totalPages, currentPage + halfMaxPagesToShow);

    if (currentPage <= halfMaxPagesToShow) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (currentPage + halfMaxPagesToShow >= totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(
        <span key="start-ellipsis" className="pagination__ellipsis">
          ...
        </span>,
      );
    }

    for (let i = startPage; i <= endPage; i++) {
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
          className={clsx(['pagination__page', {
            'pagination__page--active': i === currentPage,
          }])}
        >
          <span className="a11y-sr-only">{t('page_')}</span>
          {i}
        </Button>,
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <span key="end-ellipsis" className="pagination__ellipsis">
          ...
        </span>,
      );
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

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
          <span className="a11y-sr-only">{t('_page')}</span>
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
          <span className="a11y-sr-only">{t('_page')}</span>
        </Button>
      )}
    </div>
  );
};
