import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import { t } from '@lib/i18n';
import type { VacancyListItemFragment } from '@lib/types/datocms';
import { forwardRef } from 'react';
import './VacancyDataList.css';

export const VacancyDataList = forwardRef<
  HTMLUListElement,
  { vacancies: VacancyListItemFragment[] }
>(({ vacancies }, ref) => {
  return (
    <ul className="vacancy-data-list" ref={ref}>
      {vacancies.map((vacancy) => (
        <li className="vacancy-data-list__item" key={vacancy.id}>
          <Heading displayLevel={4} level="span">
            {vacancy.title}
          </Heading>

          <dl className="vacancy-data-list__meta">
            <dt className="a11y-sr-only">{t('work_language')}</dt>
            <dd>
              <Text as="span" variant="subtext">
                {vacancy.language}
              </Text>
            </dd>
            <dt className="a11y-sr-only">{t('company')}</dt>
            <dd>
              <Text as="span" variant="subtext">
                {vacancy.company[0]?.name}
              </Text>
            </dd>
            <dt className="a11y-sr-only">{t('contract_hours')}</dt>
            <dd>
              <Text as="span" variant="subtext">
                {vacancy.weeklyHours}
              </Text>
            </dd>
            <dt className="a11y-sr-only">{t('location')}</dt>
            <dd>
              <Text as="span" variant="subtext">
                {vacancy.location}
              </Text>
            </dd>
          </dl>

          <div>
            <Button
              as="a"
              height="narrow"
              href={vacancy.url}
              icon="external"
              level="secondary"
              target="_blank"
              variant="large"
            >
              <span className='a11y-sr-only'>
                {t('vacancy_of_agency_', { vacancy: vacancy.title, agency: vacancy.company[0]?.name })}
              </span>
              {t('see')}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
});
