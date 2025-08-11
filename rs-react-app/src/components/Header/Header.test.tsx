import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import App from '../../App';
import { ThemeProvider } from '../../hooks/useTheme/ThemeProvider';
import { setupStore } from '../../store/store';
import { TEST_REQUESTS } from '../../test-utils/mockedCardsData';

describe('Header', () => {
  const renderPage = () => {
    render(
      <Provider store={setupStore()}>
        <ThemeProvider>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it(`should change theme by click on theme button`, async () => {
    renderPage();

    const button = screen.getByRole('button', { name: 'Dark' });
    await userEvent.click(button);

    expect(document.documentElement).toHaveClass('background-light');
    expect(button).toHaveTextContent('Light');
  });
  it(`should change theme to initial by double click`, async () => {
    renderPage();

    const button = screen.getByRole('button', { name: 'Dark' });
    await userEvent.click(button);
    await userEvent.click(button);

    expect(document.documentElement).toHaveClass('background-dark');
    expect(button).toHaveTextContent('Dark');
  });
  it(`should change theme by click on theme button`, async () => {
    renderPage();

    const button = screen.getByRole('button', { name: 'Dark' });
    await userEvent.click(button);

    expect(document.documentElement).toHaveClass('background-light');
    expect(button).toHaveTextContent('Light');
  });
  it(`should show spinner after click on 'Refetch All' due to data refetching and then show card again`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.delayed);
    renderPage();

    const card = await screen.findByTestId('card');
    const button = screen.getByRole('button', { name: 'Refetch All' });
    await userEvent.click(button);

    expect(card).not.toBeInTheDocument();
    const spinner = await screen.findByTestId('spinner');

    await waitFor(async () => {
      expect(spinner).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(spinner).not.toBeInTheDocument();
    });

    await waitFor(async () => {
      const newCard = screen.getByTestId('card');
      expect(newCard).toBeInTheDocument();
    });
  });
});
