import { Button } from '@components/Button';
import { Link } from '@components/Link';
import { t } from '@lib/i18n';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FocusOn } from 'react-focus-on';
import './Menu.css';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

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
      <FocusOn
        className={clsx('menu__overlay', isOpen && 'menu__overlay--open')}
        enabled={isOpen}
        onClickOutside={closeMenu}
        onEscapeKey={closeMenu}
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
                <Link href="#" onClick={closeMenu} className="menu__link">
                  {t('about_us')}
                </Link>
              </li>
              <li>
                <Link href="#" onClick={closeMenu} className="menu__link">
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
                  {t('vacancies')} <span className="menu__counter">54</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </FocusOn>
    </div>
  );
};
