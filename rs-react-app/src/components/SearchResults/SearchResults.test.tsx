import { render, screen } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import type { SearchResultType } from '../../api/getDataFromApi';
import {
  mockedResultWithoutSource,
  mockedSeveralResults,
  TEST_REQUESTS,
} from '../../test-utils/mockedCardsData';

describe('SearchResults', () => {
  const renderResults = (results?: SearchResultType[]) =>
    render(<SearchResults results={results} />);

  it(`should show correct message when zero results received`, () => {
    renderResults([]);

    const message = screen.getByText(
      'Nothing was found on your request. Try to change input to get results (e.g. enter the whole word, not its part)'
    );

    expect(message).toBeInTheDocument();
  });
  it(`should show correct message when undefined received as results`, () => {
    renderResults();

    const message = screen.getByText(
      `Enter your word and press 'Search' to start a journey!`
    );

    expect(message).toBeInTheDocument();
  });
  it(`should show ten cards (five for each type)`, () => {
    renderResults(mockedSeveralResults);

    const cards = screen.getAllByTestId('card');
    const titleWithSimpleResult = screen.getAllByRole('heading', {
      name: TEST_REQUESTS.simple,
    });
    const titleWithoutDescription = screen.getAllByRole('heading', {
      name: TEST_REQUESTS.withoutDescription,
    });

    expect(cards).toHaveLength(10);
    expect(titleWithSimpleResult).toHaveLength(5);
    expect(titleWithoutDescription).toHaveLength(5);
  });
  it(`should process undefined source correctly`, () => {
    renderResults(mockedResultWithoutSource);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', '/no_image_available.png');
  });
});
