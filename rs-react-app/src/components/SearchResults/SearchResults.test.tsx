import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { setupStore } from '../../store/store';
import {
  mockedSimpleRequestResult,
  TEST_REQUESTS,
} from '../../test-utils/mockedCardsData';

import { SearchResults } from './SearchResults';

describe('SearchResults', () => {
  const renderResults = () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/home']}>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );
  };

  it(`should show correct message when zero results received`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.zeroResults);
    renderResults();

    const message = await screen.findByText(
      'Nothing was found on your request. Try to change input to get results (e.g. enter the whole word, not its part)'
    );

    expect(message).toBeInTheDocument();
  });
  it(`should not render pagination when zero results received`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.zeroResults);
    renderResults();

    await waitFor(
      () => {
        expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
  it(`should show ten cards`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.severalResults);
    renderResults();

    const cards = await screen.findAllByTestId('card');

    const titleWithoutDescription = await screen.findAllByRole('heading', {
      name: TEST_REQUESTS.withoutDescription,
    });

    expect(cards).toHaveLength(10);
    expect(titleWithoutDescription).toHaveLength(10);
  });
  it(`should render pagination when results are received`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.severalResults);
    renderResults();

    const pagination = await screen.findByTestId('pagination');

    expect(pagination).toBeInTheDocument();
  });
  it(`should correctly display items data`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.simple);
    renderResults();

    const image = await screen.findByRole('img');
    const title = await screen.findByRole('heading');
    const description = await screen.findByText(
      mockedSimpleRequestResult.results[0].description
    );

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      mockedSimpleRequestResult.results[0].source
    );
    expect(title).toHaveTextContent(mockedSimpleRequestResult.results[0].title);
  });
});
