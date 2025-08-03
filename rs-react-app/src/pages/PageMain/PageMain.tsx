import { Provider } from 'react-redux';
import { PageProvider } from '../../hooks/usePagination/PageProvider';
import { Flyout } from '../Flyout/Flyout';
import { PageTitle } from '../PageTitle/PageTitle';
import { ResultsSection } from '../ResultsSection/ResultsSection';
import { SearchForm } from '../SearchForm/SearchForm';
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
