import { render, screen } from '@testing-library/react';
import { BreakingButton } from './BreakingButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

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
});
