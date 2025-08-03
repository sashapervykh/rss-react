import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { TEST_REQUESTS } from './test-utils/mockedCardsData';
import { getFlyoutElements } from './test-utils/getFlyoutElements';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  const renderResults = (link: string) => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[link]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
  };

  it(`should direct to about page by link click`, async () => {
    renderResults('/home');

    const link = await screen.findByRole('link');
    await userEvent.click(link);
    const heading = await screen.findByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('About');
  });
  it(`should direct to home page by link click`, async () => {
    renderResults('/about');

    const link = await screen.findByRole('link', { name: 'Home' });
    await userEvent.click(link);
    const heading = await screen.findByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('BROWSE SPACE WITH NASA');
  });
  it(`should render details by card click`, async () => {
    localStorage.setItem('input', 'simple');
    renderResults('/home');

    const card = await screen.findByTestId('card');
    await userEvent.click(card);
    const cardDetails = await screen.findByTestId('card-details');
    expect(cardDetails).toBeInTheDocument();
  });
  it(`should remove details by click on the button`, async () => {
    localStorage.setItem('input', 'simple');
    renderResults('/home');

    const card = await screen.findByTestId('card');
    await userEvent.click(card);
    const cardDetails = await screen.findByTestId('card-details');
    const closeButtons = await screen.findByRole('button', { name: 'X' });
    await userEvent.click(closeButtons);
    expect(cardDetails).not.toBeInTheDocument();
  });
  it(`should show selected page after changing page`, async () => {
    localStorage.setItem('input', TEST_REQUESTS.severalResults);
    renderResults('/home');

    const checkbox = await screen.findAllByRole('checkbox');
    await userEvent.click(checkbox[0]);
    await userEvent.click(checkbox[1]);
    await userEvent.click(checkbox[2]);
    const nextButton = await screen.findByRole('button', { name: '>' });
    const prevButton = await screen.findByRole('button', { name: '<' });
    await userEvent.click(nextButton);
    await userEvent.click(prevButton);

    const { text, unselectButton, downloadButton } = await getFlyoutElements(3);
    expect(checkbox[0]).toBeChecked();
    expect(checkbox[1]).toBeChecked();
    expect(checkbox[2]).toBeChecked();
    expect(text).toBeInTheDocument();
    expect(unselectButton).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
  });
});
