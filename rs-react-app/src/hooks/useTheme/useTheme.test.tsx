import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import App from '../../App';
import { setupStore } from '../../store/store';
import { MockedThemeButton } from '../../test-utils/MockedThemeButton';

import { ThemeProvider } from './ThemeProvider';

describe('useTheme', () => {
  const renderPage = (theme: 'dark' | 'light') => {
    render(
      <Provider store={setupStore()}>
        <ThemeProvider>
          <MemoryRouter>
            <App />
            <MockedThemeButton newTheme={theme}></MockedThemeButton>
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };

  it(`should set dark theme as initial`, () => {
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
