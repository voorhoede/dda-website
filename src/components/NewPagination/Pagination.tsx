import { t } from '@lib/i18n';

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
    <nav className='pagination'>
      {currentPage > 1 && (
        <a
          href={pageUrl(prevPage)}
          onClick={(event) => {
            handlePageChange(prevPage);
            event.preventDefault();
          }}
        >
          {t('previous')}
          <span className="a11y-sr-only">{t('_page')}</span>
        </a>
      )}
      <ul className='pagination-list'>
        {pages.map((page) => (
          <li>
            <a
              href={pageUrl(page)}
              aria-current={page === currentPage}
              onClick={(event) => {
                handlePageChange(page);
                event.preventDefault();
              }}
            >
              <span className="a11y-sr-only">{t('page_')}</span>
              {page}
            </a>
          </li>
        ))}
      </ul>
      { currentPage < pagesCount && (
        <a
          href={pageUrl(nextPage)}
          onClick={(event) => {
            handlePageChange(nextPage);
            event.preventDefault();
          }}
        >
          {t('next')}
          <span className="a11y-sr-only">{t('_page')}</span>
        </a>
      ) }
    </nav>
  );
};
