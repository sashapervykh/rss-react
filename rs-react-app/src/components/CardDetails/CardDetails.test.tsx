import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { setupStore } from '../../store/store';
import { TEST_REQUESTS } from '../../test-utils/mockedCardsData';

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
});
