import { t } from '@lib/i18n';
import { siteName } from '@lib/seo';
import type { SiteLocale } from '@lib/types/datocms';
import './Header.css';

interface HeaderProps {
  locale: SiteLocale;
}

const Header = ({ locale }: HeaderProps) => {
  return (
    <header className="header">
      <a
        rel="home"
        href={`/${locale}/`}
        aria-label={t('go_to_home_page', { siteName })}
      >
        <img className="header__logo" src="/logo.svg" />
      </a>
    </header>
  );
};

export default Header;
