import { Provider } from 'react-redux';

import { Flyout } from '../../components/Flyout/Flyout';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { ResultsSection } from '../../components/ResultsSection/ResultsSection';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { PageProvider } from '../../hooks/usePagination/PageProvider';
import { setupStore } from '../../store/store';

const store = setupStore();

export function PageMain() {
  return (
    <Provider store={store}>
      <main>
        <PageTitle />
        <PageProvider>
          <SearchForm />
          <ResultsSection />
        </PageProvider>
        <Flyout />
      </main>
    </Provider>
  );
}
