import { render, screen } from '@testing-library/react';
import { CardText } from './CardText';

describe('CardText', () => {
  it(`should render h2 and p with given text`, () => {
    render(
      <CardText title="Test" description="Testing rendering of card text" />
    );

    const heading = screen.getByRole('heading');
    const p = screen.getByText('Testing rendering of card text');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test');
    expect(p).toBeInTheDocument();
  });
});
