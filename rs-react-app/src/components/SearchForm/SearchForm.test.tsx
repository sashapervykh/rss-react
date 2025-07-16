import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';

describe('SearchForm', () => {
  it(`should render input and two buttons`, () => {
    render(
      <SearchForm
        handleSearch={() =>
          new Promise(() => {
            console.log('Promise');
          })
        }
        disabled={true}
      />
    );

    const input = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');
    expect(input).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });
});
