import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { BuggyComponent } from '../../test-utils/BuggyComponent';
import { expectFallbackUI } from '../../test-utils/expectFallbackUI';
import { BreakingButton } from '../BreakingButton/BreakingButton';
import userEvent from '@testing-library/user-event';

describe('ErrorBoundary', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it(`should catch Error and display fallback UI`, () => {
    render(
      <ErrorBoundary>
        <BuggyComponent isError={true} />
      </ErrorBoundary>
    );

    expectFallbackUI('Throwing error to test ErrorBoundary');
  });
  it(`should display fallback UI when pressing 'BREAK' button`, async () => {
    render(
      <ErrorBoundary>
        <BreakingButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: 'BREAK!' });
    await userEvent.click(button);
    expectFallbackUI('Congratulations! You crashed the app!');
  });
});
