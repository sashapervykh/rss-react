import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchForm } from './SearchForm';

vi.mock('../hooks/useLocalStorage', () => ({
  useLocalStorage: () => ({
    updateLocalStorage: vi.fn(),
  }),
}));

describe('SearchForm', () => {
  const renderForm = () => {
    render(<SearchForm />);
    return {
      input: screen.getByRole('textbox'),
      buttons: screen.getAllByRole('button'),
      searchButton: screen.getByRole('button', { name: 'Search' }),
      breakButton: screen.getByRole('button', { name: 'BREAK!' }),
    };
  };

  it(`should render input and two buttons`, () => {
    const { input, buttons, searchButton, breakButton } = renderForm();

    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
    expect(buttons).toHaveLength(2);
    expect(searchButton).not.toBeDisabled();
    expect(breakButton).not.toBeDisabled();
  });
  it(`should update input value when user typing`, async () => {
    const { input } = renderForm();

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.type(input, 'input');

    expect(input).toHaveValue('input');
  });
  it(`should save entered trimmed search term in localStorage when pressing submit button`, async () => {
    const { input, searchButton } = renderForm();

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.type(input, '   input   ');
    await userEvent.click(searchButton);
    const savedInput = localStorage.getItem('input');
    expect(savedInput).toBe('input');
  });
  it(`should overwrites existing value with new search`, async () => {
    localStorage.setItem('input', 'done');

    const { input, searchButton } = renderForm();

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.clear(input);
    await userEvent.type(input, '   new input   ');
    await userEvent.click(searchButton);
    const savedInput = localStorage.getItem('input');
    expect(savedInput).toBe('new input');
  });
  it(`should used term saved in localStorage`, async () => {
    localStorage.setItem('input', 'input');

    const { input } = renderForm();

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    expect(input).toHaveValue('input');
  });
  it(`should show empty input if there are no term saved in localStorage`, async () => {
    const { input } = renderForm();

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    expect(input).toHaveValue('');
  });
});
