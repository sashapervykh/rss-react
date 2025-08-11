import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { expectFallbackUI } from '../../test-utils/expectFallbackUI';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

import { BreakingButton } from './BreakingButton';

describe('BreakingButton', () => {
  it(`should render button for breaking the app`, () => {
    render(<BreakingButton />);
    const button = screen.getByRole('button', { name: 'BREAK!' });

    expect(button).toBeInTheDocument();
  });
  it(`should throw an error and trigger rendering fallback UI when pressing`, async () => {
    const consoleErrorSpy: ReturnType<typeof vi.spyOn> = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <BreakingButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: 'BREAK!' });
    await userEvent.click(button);

    expectFallbackUI('Congratulations! You crashed the app!');
    consoleErrorSpy.mockRestore();
  });
});
