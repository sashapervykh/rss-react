import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { setupStore } from '../../store/store';

import { ResultsSection } from './ResultsSection';

describe('SearchResults', () => {
  const renderResults = () => {
    localStorage.setItem('input', 'simple');
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
