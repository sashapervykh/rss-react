import { PageProvider } from '../../hooks/usePagination/PageProvider';
import { PageTitle } from '../PageTitle/PageTitle';
import { ResultsSection } from '../ResultsSection/ResultsSection';
import { SearchForm } from '../SearchForm/SearchForm';

export function PageMain() {
  return (
    <main>
      <PageTitle />
      <PageProvider>
        <SearchForm />
        <ResultsSection />
      </PageProvider>
    </main>
  );
}
