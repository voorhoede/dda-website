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
      <button
        aria-controls="menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open menu"
        className="menu__burger-button"
        onClick={openMenu}
        type="button"
      >
        ☰
      </button>
      <FocusOn
        className={clsx('menu__overlay', isOpen && 'menu__overlay--open')}
        enabled={isOpen}
        onClickOutside={closeMenu}
        onEscapeKey={closeMenu}
      >
        <div className="menu__content">
          <div className="menu__header">
            <button
              aria-label="Close menu"
              className="menu__close-button"
              onClick={closeMenu}
              type="button"
            >
              &times;
            </button>
          </div>
          <nav id="menu">
            <ul className="menu__list">
              <li>
                <a href="#" onClick={closeMenu} className="menu__link">
                  {t('about_us')}
                </a>
              </li>
              <li>
                <a href="#" onClick={closeMenu} className="menu__link">
                  {t('events')}
                </a>
              </li>
              <li>
                <a href="#" onClick={closeMenu} className="menu__link">
                  {t('publications')}
                </a>
              </li>
              <li>
                <a href="#" onClick={closeMenu} className="menu__link">
                  {t('members')}
                </a>
              </li>
              <li>
                <a href="#" onClick={closeMenu} className="menu__link">
                  {t('vacancies')} <span className="menu__counter">54</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </FocusOn>
    </div>
  );
};
