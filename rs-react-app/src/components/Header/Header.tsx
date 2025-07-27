import { Link, useLocation } from 'react-router';
import styles from './styles.module.css';

export function Header() {
  const location = useLocation();
  const linkPath = location.pathname.includes('home') ? '/about' : '/home';
  const linkText = location.pathname.includes('home') ? 'About' : 'Home';

  return (
    <header>
      <Link to={linkPath} className={styles.link}>
        {linkText}
      </Link>
    </header>
  );
}
