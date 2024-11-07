import { Menu } from '@components/Menu';
import { getLocale, t } from '@lib/i18n';
import { siteName } from '@lib/seo';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import './Header.css';

export const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef(null);
  const locale = getLocale();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 1.0, rootMargin: '31px' },
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

  return (
    <header
      ref={headerRef}
      className={clsx('header', isSticky && 'header--sticky')}
    >
      <a
        rel="home"
        href={`/${locale}/`}
        aria-label={t('go_to_home_page', { siteName })}
      >
        <img
          alt=""
          className="header__logo"
          height={80}
          src="/logo.svg"
          width={106}
        />
      </a>
      <Menu />
    </header>
  );
};
