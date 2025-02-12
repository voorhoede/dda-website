import { t } from '@lib/i18n';
import { Button } from '@components/Button';

import './Pagination.css';

interface Props {
  url: string;
  currentPage: number;
  recordsCount: number;
  recordsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  url,
  currentPage,
  recordsCount,
  recordsPerPage,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(recordsCount / recordsPerPage);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const pageUrl = (page: number) => {
    const newUrl = new URL(url);
    newUrl.searchParams.set('page', page.toString());
    return newUrl.toString();
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav className="pagination">
      {currentPage > 1 && (
        <Button
          as="a"
          level="secondary"
          variant="large"
          href={pageUrl(prevPage)}
          onClick={(event) => {
            handlePageChange(prevPage);
            event.preventDefault();
          }}
        >
          {t('previous')}
          <span className="a11y-sr-only">{t('_page')}</span>
        </Button>
      )}
      <div className="pagination-list">
        {1 < currentPage - 2 && (
          <span className="pagination__ellipsis">...</span>
        )}
        <ul>
          {pages
            .filter((page) => {
              if (currentPage <= 3) {
                return page <= 5;
              } else if (currentPage >= pages.length - 2) {
                return page > pages.length - 5;
              }
              return Math.abs(page - currentPage) <= 2;
            })
            .map((page) => (
              <li>
                <Button
                  as="a"
                  level="secondary"
                  variant="large"
                  className="pagination-list__item"
                  href={pageUrl(page)}
                  aria-current={page === currentPage && 'page'}
                  onClick={(event) => {
                    handlePageChange(page);
                    event.preventDefault();
                  }}
                >
                  <span className="a11y-sr-only">{t('page_')}</span>
                  {page}
                </Button>
              </li>
            ))}
        </ul>
        {pages.length > currentPage + 2 && (
          <span className="pagination__ellipsis">...</span>
        )}
      </div>
      {currentPage < pagesCount && (
        <Button
          as="a"
          level="secondary"
          variant="large"
          href={pageUrl(nextPage)}
          onClick={(event) => {
            handlePageChange(nextPage);
            event.preventDefault();
          }}
        >
          {t('next')}
          <span className="a11y-sr-only">{t('_page')}</span>
        </Button>
      )}
    </nav>
  );
};
