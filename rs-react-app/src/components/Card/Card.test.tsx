import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it(`should render Card with given src and alt, heading and paragraph with given text`, () => {
    render(
      <Card
        source="/somesrc.img"
        title="Test"
        description="Testing rendering card"
        media_type="image"
      />
    );

    const image = screen.getByRole('img');
    const heading = screen.getByRole('heading');
    const description = screen.getByText('Testing rendering card');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/somesrc.img');
    expect(image).toHaveAttribute('alt', 'Test');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test');

    expect(description).toBeInTheDocument();
  });
});
