import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';

import App from '../../App';
import { MockedThemeButton } from '../../test-utils/MockedThemeButton';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('ThemeContext', () => {
  const renderPage = (theme: 'dark' | 'light') => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <App />
          <MockedThemeButton newTheme={theme}></MockedThemeButton>
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it(`should have dark theme as initial`, () => {
    renderPage('dark');
    expect(document.documentElement).toHaveClass('background-dark');
  });
  it(`should change theme to light`, async () => {
    renderPage('light');
    const button = screen.getByRole('button', { name: 'theme' });
    await userEvent.click(button);
    expect(document.documentElement).toHaveClass('background-light');
  });
});
