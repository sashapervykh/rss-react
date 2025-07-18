import { render, screen } from '@testing-library/react';
import { BreakingButton } from './BreakingButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import userEvent from '@testing-library/user-event';
import { expectFallbackUI } from '../../test-utils/expectFallbackUI';

describe('BreakingButton', () => {
  const renderBreakingButton = () => {
    render(
      <ErrorBoundary>
        <BreakingButton />
      </ErrorBoundary>
    );

    return screen.getByRole('button', { name: 'BREAK!' });
  };
  it(`should render button for breaking the app`, () => {
    const button = renderBreakingButton();

    expect(button).toBeInTheDocument();
  });
  it(`should render fallback ui when pressing the button`, async () => {
    const button = renderBreakingButton();

    await userEvent.click(button);
    expectFallbackUI('Congratulations! You crashed the app!');
  });
});
