import styles from '../NotFoundPage/styles.module.css';

export function AboutPage() {
  return (
    <main className={styles.main}>
      <h1>About</h1>
      <div className={styles['page-message']}>
        This page was created by{' '}
        <a href="https://github.com/sashapervykh">Sasha Pervykh</a> as one of
        the tasks in{' '}
        <a href="https://rs.school/courses/reactjs">React course</a> (
        <a href="https://rs.school/">The Rolling Scope Schools</a>){' '}
      </div>
    </main>
  );
}
