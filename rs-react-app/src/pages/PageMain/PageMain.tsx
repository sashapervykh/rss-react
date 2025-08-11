import { Flyout } from '../../components/Flyout/Flyout';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { ResultsSection } from '../../components/ResultsSection/ResultsSection';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { PageProvider } from '../../hooks/usePagination/PageProvider';

import styles from './styles.module.css';

export function PageMain() {
  return (
    <main className={styles.main}>
      <PageTitle />
      <PageProvider>
        <SearchForm />
        <ResultsSection />
      </PageProvider>
      <Flyout />
    </main>
  );
}
