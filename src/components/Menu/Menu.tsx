import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { t } from '@lib/i18n';
import { createFocusTrap } from 'focus-trap';
import './Menu.css';

let vacancyCount: string;

// using this method we can get the vacancy count on the server
// and use it in the client by retreving it from the DOM.
// we do this because we can only use getCollection on the server
if (import.meta.env.SSR) {
  const { getCollection } = await import('astro:content');

  const vacancies = await getCollection('vacancies');

  vacancyCount = vacancies.length.toString();
} else {
  vacancyCount =
    document.querySelector('[data-vacancy-count]')?.textContent || '';
}

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  if (!import.meta.env.SSR) {
    vacancyCount =
      document.querySelector('[data-vacancy-count]')?.textContent || '';
  }

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setIsResizing(false), 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    const focusTrap = createFocusTrap(overlayRef.current, {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      onDeactivate: closeMenu,
    });

    if (isOpen) {
      focusTrap.activate();
    } else {
      focusTrap.deactivate();
    }

    return () => {
      focusTrap.deactivate();
    };
  }, [isOpen, openMenu, closeMenu]);

  return (
    <div className={clsx('menu', isResizing && 'menu--resizing')}>
      <Button
        aria-controls="menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open menu"
        className="menu__burger-button"
        icon="burger"
        iconOnly
        onClick={openMenu}
      />
      <div
        ref={overlayRef}
        className={clsx('menu__overlay', isOpen && 'menu__overlay--open')}
      >
        <div className="menu__content">
          <div className="menu__header">
            <Button
              aria-label="Close menu"
              className="menu__close-button"
              icon="close"
              iconOnly
              onClick={closeMenu}
            />
          </div>
          <nav id="menu">
            <ul className="menu__list">
              <li>
                <Link
                  href="/over-ons/"
                  onClick={closeMenu}
                  className="menu__link"
                >
                  {t('about_us')}
                </Link>
              </li>
              <li>
                <Link
                  href="/events/"
                  onClick={closeMenu}
                  className="menu__link"
                >
                  {t('events')}
                </Link>
              </li>
              <li>
                <Link
                  href="/publicaties/"
                  onClick={closeMenu}
                  className="menu__link"
                >
                  {t('publications')}
                </Link>
              </li>
              <li>
                <Link href="/leden/" onClick={closeMenu} className="menu__link">
                  {t('members')}
                </Link>
              </li>
              <li>
                <Link
                  href="/vacatures/"
                  onClick={closeMenu}
                  className="menu__link"
                >
                  {t('vacancies')}{' '}
                  <span className="menu__counter" data-vacancy-count>
                    {vacancyCount}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="menu__footer">
            <Button
              as="a"
              icon="arrow-right"
              level="secondary"
              href="/inloggen/"
              target="_blank"
            >
              {t('login')}
            </Button>
            <Button as="a" icon="arrow-right" href="https://aanmelden-dutchdigitalagencies.com/lid-worden" target="_blank">
              {t('become_a_member')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
