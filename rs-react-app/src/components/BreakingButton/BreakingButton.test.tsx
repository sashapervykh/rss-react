import { render, screen } from '@testing-library/react';
import { BreakingButton } from './BreakingButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import userEvent from '@testing-library/user-event';

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

    const firstParagraph = screen.getByText('Something went wrong...');
    const secondParagraph = screen.getByText(`Press 'Reset' to try again`);
    const details = screen.getByRole('group');
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(details).toHaveTextContent('Congratulations! You crashed the app!');
    expect(resetButton).toBeInTheDocument();
  });
});
