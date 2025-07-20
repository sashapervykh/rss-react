import { screen } from '@testing-library/react';

export function expectFallbackUI(errorDescription: string) {
  const firstParagraph = screen.getByText('Something went wrong...');
  const secondParagraph = screen.getByText(`Press 'Reset' to try again`);
  const details = screen.getByRole('group');
  const resetButton = screen.getByRole('button', { name: 'Reset' });

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
  expect(details).toBeInTheDocument();
  expect(details).toHaveTextContent(errorDescription);
  expect(resetButton).toBeInTheDocument();
}
