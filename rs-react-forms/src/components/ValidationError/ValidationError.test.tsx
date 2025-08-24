import { render, screen } from '@testing-library/react';
import { ValidationError } from './ValidationError';

describe('ValidationError', () => {
  it(`should render paragraph with the given text`, () => {
    render(<ValidationError message="Test" />);
    const message = screen.getByText('Test');

    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Test');
  });
});
