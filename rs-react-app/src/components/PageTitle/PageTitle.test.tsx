import { render, screen } from '@testing-library/react';
import { PageTitle } from './PageTitle';

describe('PageTitle', () => {
  it(`should render 'BROWSE TEXT WITH NASA'`, () => {
    render(<PageTitle />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/browse space with nasa/i);
  });
});
