import { render, screen } from '@testing-library/react';
import { BreakingButton } from './BreakingButton';

describe('BreakingButton', () => {
  it(`should render button for breaking the app`, () => {
    render(<BreakingButton />);
    const button = screen.getByRole('button', { name: 'BREAK!' });

    expect(button).toBeInTheDocument();
  });
});
