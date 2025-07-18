import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { BuggyComponent } from '../../test-utils/BuggyComponent';

describe('ErrorBoundary', () => {
  it(`should catch Error and display fallback UI`, () => {
    render(
      <ErrorBoundary>
        <BuggyComponent isError={true} />
      </ErrorBoundary>
    );

    const firstParagraph = screen.getByText('Something went wrong...');
    const secondParagraph = screen.getByText(`Press 'Reset' to try again`);
    const details = screen.getByRole('group');
    const button = screen.getByRole('button', { name: 'Reset' });

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
    expect(details).toBeInTheDocument();
    expect(details).toHaveTextContent('Throwing error to test ErrorBoundary');
    expect(button).toBeInTheDocument();
  });
});
