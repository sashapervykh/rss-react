import { Link, useLocation } from 'react-router';

import { useTheme } from '../../hooks/useTheme/useTheme';
import { Button } from '../Button/Button';

import styles from './styles.module.css';

export function Header() {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const linkPath = location.pathname.includes('home') ? '/about' : '/home';
  const linkText = location.pathname.includes('home') ? 'About' : 'Home';

  return (
    <header className={styles.header}>
      <Button
        text={theme[0].toUpperCase() + theme.slice(1)}
        onClick={() => {
          setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
          localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
        }}
      />
      <Link
        to={linkPath}
        className={`${styles.link} ${styles[`link-${theme}`]}`}
      >
        {linkText}
      </Link>
    </header>
  );
}
