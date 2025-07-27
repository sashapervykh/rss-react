import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router';
import { ResultsSection } from './ResultsSection';

describe('SearchResults', () => {
  const renderResults = () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <ResultsSection />
      </MemoryRouter>
    );
  };

  it(`should render Card`, async () => {
    renderResults();

    const card = await screen.findByTestId('card');

    expect(card).toBeInTheDocument();
  });
});
