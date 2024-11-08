import logo from '@assets/logo.svg';
import { Column, Grid } from '@components/Grid';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { getLocale, t } from '@lib/i18n';
import { siteName } from '@lib/seo';
import './Footer.css';

export const Footer = () => {
  const locale = getLocale();

  return (
    <Grid as="footer" className="footer" border={true}>
      <Column span={{ mobile: 12, desktop: 6 }}>
        <Link
          rel="home"
          href={`/${locale}/`}
          aria-label={t('go_to_home_page', { siteName })}
          className="footer__logo-link"
        >
          <img
            alt=""
            className="footer__logo"
            height={logo.height}
            src={logo.src}
            width={logo.width}
          />
        </Link>
      </Column>
      <Column as="nav" span={{ mobile: 12, tablet: 6, desktop: 3 }}>
        <ul className="footer__links">
          <li>
            <Link href="#">{t('about_us')}</Link>
          </li>
          <li>
            <Link href="#">{t('events')}</Link>
          </li>
          <li>
            <Link href="#">{t('publications')}</Link>
          </li>
          <li>
            <Link href="#">{t('members')}</Link>
          </li>
          <li>
            <Link href="#">{t('vacancies')}</Link>
          </li>
          <li>
            <Link href="#">{t('terms_and_conditions')}</Link>
          </li>
          <li>
            <Link href="#">{t('privacy_policy')}</Link>
          </li>
        </ul>
      </Column>
      <Column
        span={{ mobile: 12, tablet: 6, desktop: 3 }}
        className="footer__contact"
      >
        <address className="footer__address">
          <Text>Dutch Digital Agencies</Text>
          <Text>Overhoeksplein 1</Text>
          <Text>1031 KS Amsterdam</Text>
        </address>
        <div className="footer__contact-info">
          <Text>
            <Link href="tel:+31854010391">(0)85 4010391</Link>
          </Text>
          <Text>
            <Link href="mailto:info@dutchdigitalagencies.com">
              info@dutchdigitalagencies.com
            </Link>
          </Text>
        </div>
      </Column>
      <Column span={12} className="footer__bottom">
        <ul className="footer__socials">
          <li>
            <Link href="#">Instagram</Link>
          </li>
          <li>
            <Link href="#">Facebook</Link>
          </li>
          <li>
            <Link href="#">Linkedin</Link>
          </li>
        </ul>
        <Text className="footer__copyright">
          Copyright &copy; 2023 Dutch Digital Agencies
        </Text>
      </Column>
    </Grid>
  );
};
