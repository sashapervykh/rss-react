import { Link } from 'react-router';
import styles from './styles.module.css';

export function MainHeader() {
  return (
    <header>
      <Link to={'/about'} className={styles.link}>
        About
      </Link>
    </header>
  );
}
