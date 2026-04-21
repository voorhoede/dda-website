import logo from '@assets/logo.svg';
import { Link } from '@components/Link';
import { Menu } from '@components/Menu';
import { t } from '@lib/i18n';
import { siteName } from '@lib/seo';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import './Header.css';

export type HeaderVariant = 'default' | 'aiInternships';

type HeaderProps = {
  variant?: HeaderVariant;
};

export const Header = ({ variant = 'default' }: HeaderProps = {}) => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 1.0, rootMargin: '-17px' },
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const isAiInternships = variant === 'aiInternships';
  const logoHref = isAiInternships ? '/ai-stages/' : '/';

  return (
    <header
      ref={headerRef}
      className={clsx('header', isSticky && 'header--sticky')}
    >
      <Link rel="home" href={logoHref} aria-label={t('go_to_home_page', { siteName })}>
        <img
          alt=""
          className="header__logo"
          height={logo.height}
          src={logo.src}
          width={logo.width}
        />
      </Link>
      {!isAiInternships && <Menu />}
    </header>
  );
};
