import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it(`should render title and message`, () => {
    render(<NotFoundPage />);
    const header = screen.getByRole('heading');
    const message = screen.getByTestId('not-found-message');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('The page is not found...');
    expect(message).toBeInTheDocument();
  });
});
