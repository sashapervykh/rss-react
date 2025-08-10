import { useTheme } from '../../hooks/useTheme/useTheme';
import shared from '../../styles/shared.module.css';
import styles from '../NotFoundPage/styles.module.css';

import aboutStyle from './style.module.css';
import GitHubLogo from '/github-mark.svg?url';

export function AboutPage() {
  const { theme } = useTheme();
  return (
    <main className={`${styles.main} ${shared[`element-${theme}`]}`}>
      <h1>About</h1>
      <div className={styles['page-message']} data-testid="about-message">
        <span>
          This page was created by Sasha Pervykh as one of the tasks in React
          course The Rolling Scope Schools.
        </span>
        <div className={aboutStyle['links-wrapper']}>
          <a
            className={`${aboutStyle['external-link']} ${aboutStyle[`external-link_${theme}`]}`}
            href="https://rs.school/courses/reactjs"
          >
            React Course
          </a>
          <a
            className={`${aboutStyle['external-link']} ${aboutStyle[`external-link_${theme}`]}`}
            href="https://github.com/sashapervykh"
          >
            <div className={aboutStyle['logo-wrapper']}>
              <img
                src={GitHubLogo}
                alt="GitHub logo image"
                className={aboutStyle.logo}
              />
            </div>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </main>
  );
}
