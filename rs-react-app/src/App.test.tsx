import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  const renderResults = (link: string) => {
    render(
      <MemoryRouter initialEntries={[link]}>
        <App />
      </MemoryRouter>
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
  it(`should direct to about page by link click`, async () => {
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
});
