import { render, screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it(`should render title and message`, () => {
    render(<AboutPage />);
    const header = screen.getByRole('heading');
    const message = screen.getByTestId('about-message');

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('About');
    expect(message).toBeInTheDocument();
  });
});
