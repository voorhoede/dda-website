import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';
import type { VacancyListItemFragment } from '@lib/types/datocms';
import './VacancyList.css';
import { t } from '@lib/i18n';

export const VacancyList = ({
  vacancies,
}: {
  vacancies: VacancyListItemFragment[];
}) => {
  return (
    <ul className="vacancy-list">
      {vacancies.map((vacancy) => (
        <li className="vacancy-list__item" key={vacancy.id}>
          <Heading displayLevel={4} level="span">
            {vacancy.title}
          </Heading>

          <dl className="vacancy-list__meta">
            <dt className="a11y-sr-only">{t('work_language')}</dt>
            <dd>
              <Text as="span" variant="subtext">
                {vacancy.language}
              </Text>
            </dd>
            <dt className="a11y-sr-only">{t('company')}</dt>
            <dd>
              <Text as="span" variant="subtext">
                {vacancy.company.name}
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
                {vacancy.company.location}
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
              {t('see')}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};
