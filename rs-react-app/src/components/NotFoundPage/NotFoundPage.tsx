import styles from './styles.module.css';

export function NotFoundPage() {
  return (
    <main className={styles.main}>
      <h1>The page is not found...</h1>
      <div className={styles['page-message']}>
        The page you requested does not exist. Return to main and try to find
        what you are looking for there.
      </div>
    </main>
  );
}
