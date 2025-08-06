import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import App from '../../App';
import { ThemeProvider } from '../../hooks/useTheme/ThemeProvider';

describe('Header', () => {
  const renderPage = () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
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
});
