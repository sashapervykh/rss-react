import styles from '../NotFoundPage/styles.module.css';
import shared from '../../styles/shared.module.css';
import { useTheme } from '../../hooks/useTheme/useTheme';

export function AboutPage() {
  const { theme } = useTheme();
  return (
    <main className={`${styles.main} ${shared[`element-${theme}`]}`}>
      <h1>About</h1>
      <div className={styles['page-message']} data-testid="about-message">
        This page was created by{' '}
        <a className={styles.link} href="https://github.com/sashapervykh">
          Sasha Pervykh
        </a>{' '}
        as one of the tasks in{' '}
        <a className={styles.link} href="https://rs.school/courses/reactjs">
          React course
        </a>{' '}
        (
        <a className={styles.link} href="https://rs.school/">
          The Rolling Scope Schools
        </a>
        ){' '}
      </div>
    </main>
  );
}
