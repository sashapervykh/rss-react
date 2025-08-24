import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it(`should render button with the given text`, () => {
    render(<Button text="Test" />);
    const button = screen.getByRole('button', { name: 'Test' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test');
  });
  it(`should render disabled button when disabled props is true`, () => {
    render(<Button text="Test" disabled={true} />);
    const button = screen.getByRole('button', { name: 'Test' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test');
    expect(button).toBeDisabled();
  });
  it(`should render button with specified tabIndex`, () => {
    render(<Button text="Test" tabIndex={-1} />);
    const button = screen.getByRole('button', { name: 'Test' });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });
  it(`should render button with specified onClick function`, async () => {
    let i = 0;
    render(<Button text="Test" onClick={() => ++i} />);
    const button = screen.getByRole('button', { name: 'Test' });
    await userEvent.click(button);

    expect(i).toBe(1);
  });
});
