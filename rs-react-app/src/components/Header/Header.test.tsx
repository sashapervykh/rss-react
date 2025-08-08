import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import App from '../../App';
import { ThemeProvider } from '../../hooks/useTheme/ThemeProvider';
import { setupStore } from '../../store/store';

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
});
