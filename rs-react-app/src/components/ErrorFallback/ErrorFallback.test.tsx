import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { expectFallbackUI } from '../../test-utils/expectFallbackUI';
import { BreakingButton } from '../BreakingButton/BreakingButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  it(`should render fallback UI`, () => {
    render(<ErrorFallback message="Testing Fallback UI" reset={vi.fn} />);

    expectFallbackUI('Testing Fallback UI');
  });
  it(`should reset state by pressing "Reset" button`, async () => {
    render(
      <ErrorBoundary>
        <BreakingButton />
      </ErrorBoundary>
    );
    const consoleErrorSpy: ReturnType<typeof vi.spyOn> = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const initialButton = screen.getByRole('button', { name: 'BREAK!' });

    await userEvent.click(initialButton);
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    await userEvent.click(resetButton);

    const rerenderedButton = screen.getByRole('button', { name: 'BREAK!' });

    expect(rerenderedButton).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
