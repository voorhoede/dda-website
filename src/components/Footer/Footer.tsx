import { Column, Grid } from '@components/Grid';
import { getLocale, t } from '@lib/i18n';
import { siteName } from '@lib/seo';
import './Footer.css';
import { Text } from '@components/Text';

export const Footer = () => {
  const locale = getLocale();

  return (
    <footer className="footer">
      <Grid border={true}>
        <Column span={{ mobile: 12, desktop: 6 }}>
          <a
            rel="home"
            href={`/${locale}/`}
            aria-label={t('go_to_home_page', { siteName })}
            className="footer__logo-link"
          >
            <img
              alt=""
              className="footer__logo"
              height={80}
              src="/logo.svg"
              width={106}
            />
          </a>
        </Column>
        <Column span={{ mobile: 12, tablet: 6, desktop: 3 }}>
          <nav>
            <ul className="footer__links">
              <li>
                <a href="#">{t('about_us')}</a>
              </li>
              <li>
                <a href="#">{t('events')}</a>
              </li>
              <li>
                <a href="#">{t('publications')}</a>
              </li>
              <li>
                <a href="#">{t('members')}</a>
              </li>
              <li>
                <a href="#">{t('vacancies')}</a>
              </li>
              <li>
                <a href="#">{t('terms_and_conditions')}</a>
              </li>
              <li>
                <a href="#">{t('privacy_policy')}</a>
              </li>
            </ul>
          </nav>
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
              <a href="tel:+31854010391">(0)85 4010391</a>
            </Text>
            <Text>
              <a href="mailto:info@dutchdigitalagencies.com">
                info@dutchdigitalagencies.com
              </a>
            </Text>
          </div>
        </Column>
        <Column span={12} className="footer__bottom">
          <ul className="footer__socials">
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Linkedin</a>
            </li>
          </ul>
          <Text className="footer__copyright">
            Copyright &copy; 2023 Dutch Digital Agencies
          </Text>
        </Column>
      </Grid>
    </footer>
  );
};
