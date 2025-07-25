import { PageProvider } from '../../hooks/usePagination/PageProvider';
import { PageTitle } from '../PageTitle/PageTitle';
import { SearchForm } from '../SearchForm/SearchForm';
import { SearchResults } from '../SearchResults/SearchResults';

export function PageMain() {
  return (
    <main>
      <PageTitle />
      <SearchForm />
      <PageProvider>
        <SearchResults />
      </PageProvider>
    </main>
  );
}
