import { render, screen } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import {
  getDataFromApi,
  type SearchResultType,
} from '../../api/getDataFromApi';
import {
  mockedResultWithoutSource,
  mockedSeveralResults,
  mockedSimpleRequestResult,
  TEST_REQUESTS,
} from '../../test-utils/mockedCardsData';

describe('SearchResults', () => {
  beforeEach(() => {
    vi.mock('../../api/getDataFromApi', () => ({
      getDataFromApi: vi.fn(),
    }));
  });

  const renderResults = (results: SearchResultType[]) => {
    vi.mocked(getDataFromApi).mockResolvedValueOnce(results);
    render(<SearchResults />);
  };

  it(`should show correct message when zero results received`, async () => {
    renderResults([]);

    const message = await screen.findByText(
      'Nothing was found on your request. Try to change input to get results (e.g. enter the whole word, not its part)'
    );

    expect(message).toBeInTheDocument();
  });
  it(`should show ten cards (five for each type)`, async () => {
    renderResults(mockedSeveralResults);

    const cards = await screen.findAllByTestId('card');
    const titleWithSimpleResult = await screen.findAllByRole('heading', {
      name: TEST_REQUESTS.simple,
    });
    const titleWithoutDescription = await screen.findAllByRole('heading', {
      name: TEST_REQUESTS.withoutDescription,
    });

    expect(cards).toHaveLength(10);
    expect(titleWithSimpleResult).toHaveLength(5);
    expect(titleWithoutDescription).toHaveLength(5);
  });
  it(`should process undefined source correctly`, async () => {
    renderResults(mockedResultWithoutSource);

    const image = await screen.findByRole('img');

    expect(image).toHaveAttribute('src', '/no_image_available.png');
  });
  it(`should correctly display items data`, async () => {
    renderResults(mockedSimpleRequestResult);

    const image = await screen.findByRole('img');
    const title = await screen.findByRole('heading');
    const description = await screen.findByText(
      mockedSimpleRequestResult[0].description
    );

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockedSimpleRequestResult[0].source);
    expect(title).toHaveTextContent(mockedSimpleRequestResult[0].title);
  });
});
