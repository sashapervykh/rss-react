import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import { ResultsSection } from './ResultsSection';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

describe('SearchResults', () => {
  const renderResults = () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/home']}>
          <ResultsSection />
        </MemoryRouter>
      </Provider>
    );
  };

  it(`should render Card`, async () => {
    renderResults();

    const card = await screen.findByTestId('card');

    expect(card).toBeInTheDocument();
  });
});
