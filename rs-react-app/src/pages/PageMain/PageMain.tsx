import { Flyout } from '../../components/Flyout/Flyout';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { ResultsSection } from '../../components/ResultsSection/ResultsSection';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { PageProvider } from '../../hooks/usePagination/PageProvider';

export function PageMain() {
  return (
    <main>
      <PageTitle />
      <PageProvider>
        <SearchForm />
        <ResultsSection />
      </PageProvider>
      <Flyout />
    </main>
  );
}
