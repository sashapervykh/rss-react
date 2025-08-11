import { Link, useLocation } from 'react-router';

import { nasaApi } from '../../api/apiSlice';
import { useCustomDispatch } from '../../hooks/reduxHooks';
import { useTheme } from '../../hooks/useTheme/useTheme';
import { Button } from '../Button/Button';

import styles from './styles.module.css';

export function Header() {
  const dispatch = useCustomDispatch();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const linkPath = location.pathname.includes('home') ? '/about' : '/home';
  const linkText = location.pathname.includes('home') ? 'About' : 'Home';

  return (
    <header className={styles.header}>
      <div className={styles.controls}>
        <Button
          text={theme[0].toUpperCase() + theme.slice(1)}
          onClick={() => {
            setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
            localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
          }}
        />
        {location.pathname.includes('home') && (
          <Button
            text="Refetch All"
            onClick={() => {
              dispatch(nasaApi.util.resetApiState());
            }}
          />
        )}
        <Link
          to={linkPath}
          className={`${styles.link} ${styles[`link-${theme}`]}`}
        >
          {linkText}
        </Link>
      </div>
    </header>
  );
}
