import styles from './styles.module.css';
import shared from '../../styles/shared.module.css';
import { useTheme } from '../../hooks/useTheme/useTheme';

export function NotFoundPage() {
  const { theme } = useTheme();

  return (
    <main className={`${styles.main} ${shared[`element-${theme}`]}`}>
      <h1>The page is not found...</h1>
      <div className={styles['page-message']} data-testid="not-found-message">
        The page you requested does not exist. Return to main and try to find
        what you are looking for there.
      </div>
    </main>
  );
}
