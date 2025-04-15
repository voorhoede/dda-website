import logo from '@assets/logo.svg';
import { Column, Grid } from '@components/Grid';
import { Link } from '@components/Link';
import { Text } from '@components/Text';
import { t } from '@lib/i18n';
import { siteName } from '@lib/seo';
import './Footer.css';

type FooterProps = {
  links: {
    title: string;
    url: string;
  }[];
};

export const Footer = ({ links }: FooterProps) => {
  return (
    <Grid as="footer" className="footer" border={true}>
      <Column span={{ mobile: 12, desktop: 5 }}>
        <Link
          rel="home"
          href="/"
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
          {links.map((link) => (
            <li key={link.url}>
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </Column>
      <Column
        span={{ mobile: 12, tablet: 6, desktop: 4 }}
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
            <Link
              href="https://www.instagram.com/dutchdigitalagencies/"
              target="_blank"
            >
              Instagram
            </Link>
          </li>
          <li>
            <Link
              href="https://www.facebook.com/dutchdigitalagencies"
              target="_blank"
            >
              Facebook
            </Link>
          </li>
          <li>
            <Link
              href="https://www.linkedin.com/company/dutch-digital-agencies/"
              target="_blank"
            >
              Linkedin
            </Link>
          </li>
        </ul>
        <Text className="footer__copyright">{t('copyright_disclaimer')}</Text>
      </Column>
    </Grid>
  );
};
