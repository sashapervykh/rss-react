import { Provider } from 'react-redux';
import { PageProvider } from '../../hooks/usePagination/PageProvider';

import { setupStore } from '../../store/store';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { ResultsSection } from '../../components/ResultsSection/ResultsSection';
import { Flyout } from '../../components/Flyout/Flyout';

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
