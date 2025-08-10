import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { setupStore } from '../../store/store';
import { TEST_REQUESTS } from '../../test-utils/mockedCardsData';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

import { CardDetails } from './CardDetails';

describe('CardDetails', () => {
  it(`should show spinner after click by "Refetch" button and then show card details again`, async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter
          initialEntries={[`/home?details=${TEST_REQUESTS.delayed}`]}
        >
          <CardDetails />
        </MemoryRouter>
      </Provider>
    );

    const heading = await screen.findByRole('heading', { level: 2 });
    const refetchButton = await screen.findByRole('button', {
      name: '\u{21BA}',
    });

    await userEvent.click(refetchButton);
    waitFor(() => {
      expect(heading).not.toBeInTheDocument();
    });

    const spinner = await screen.findByTestId('spinner');

    expect(spinner).toBeInTheDocument();

    waitFor(() => {
      expect(spinner).not.toBeInTheDocument();
    });

    const newHeading = await screen.findByRole('heading', { level: 2 });
    expect(newHeading).toBeInTheDocument();
    expect(newHeading).toHaveTextContent(TEST_REQUESTS.delayed);
  });
  it(`should throw an error for not found details`, async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter
          initialEntries={[`/home?details=${TEST_REQUESTS.notFound}`]}
        >
          <ErrorBoundary>
            <CardDetails />
          </ErrorBoundary>
        </MemoryRouter>
      </Provider>
    );

    const errorText = await screen.findByText(
      'The requested resource is not found. Status code: 404'
    );
    expect(errorText).toBeInTheDocument();
  });
});
