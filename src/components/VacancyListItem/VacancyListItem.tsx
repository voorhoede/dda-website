import type { VacancyListItemFragment } from '@lib/types/datocms';

import { t } from '@lib/i18n';

import { Button } from '@components/Button';
import { Heading } from '@components/Heading';
import { Text } from '@components/Text';

import './VacancyListItem.css';

type Props = {
  vacancy: VacancyListItemFragment;
};

export const VacancyListItem = ({ vacancy }: Props) => {
  return (
    <li className="vacancy-list-item">
      <Heading displayLevel={4} level="span">
        {vacancy.title}
      </Heading>

      <dl className="vacancy-list-item__meta">
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
          targetArea="parent"
        >
          <span className="a11y-sr-only">
            {t('vacancy_title_at_agency', {
              title: vacancy.title,
              agency: vacancy.company[0]?.name,
            })}
          </span>
          {t('see')}
        </Button>
      </div>
    </li>
  );
};
