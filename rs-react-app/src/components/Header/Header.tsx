import { Link, useLocation } from 'react-router';
import styles from './styles.module.css';
import { Button } from '../Button/Button';
import { useTheme } from '../../hooks/useTheme/useTheme';

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
        }}
      />
      <Link to={linkPath} className={styles.link}>
        {linkText}
      </Link>
    </header>
  );
}
