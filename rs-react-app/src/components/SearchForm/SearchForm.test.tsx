import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  const renderForm = (disabled: boolean = false) => {
    const fn = vi.fn();
    render(<SearchForm handleSearch={fn} disabled={disabled} />);
    return {
      fn: fn,
      input: screen.getByRole('textbox'),
      buttons: screen.getAllByRole('button'),
      searchButton: screen.getByRole('button', { name: 'Search' }),
      breakButton: screen.getByRole('button', { name: 'BREAK!' }),
    };
  };

  it(`should render disabled input and two buttons (search button is disabled, break button is active) when get disabled=true`, () => {
    const { input, buttons, searchButton, breakButton } = renderForm(true);

    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(buttons).toHaveLength(2);
    expect(searchButton).toBeDisabled();
    expect(breakButton).not.toBeDisabled();
  });
  it(`should render active input and two active buttons when get disabled=false`, () => {
    const { input, buttons, searchButton, breakButton } = renderForm(false);

    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
    expect(buttons).toHaveLength(2);
    expect(searchButton).not.toBeDisabled();
    expect(breakButton).not.toBeDisabled();
  });
  it(`should update input value when user typing`, async () => {
    const { input } = renderForm(false);

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.type(input, 'input');

    expect(input).toHaveValue('input');
  });
  it(`should save entered trimmed search term in localStorage when pressing submit button`, async () => {
    const { input, searchButton } = renderForm(false);

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.type(input, '   input   ');
    await userEvent.click(searchButton);
    const savedInput = localStorage.getItem('input');
    expect(savedInput).toBe('input');
  });
  it(`should overwrites existing value with new search`, async () => {
    localStorage.setItem('input', 'done');

    const { input, searchButton } = renderForm(false);

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

    const { input } = renderForm(false);

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    expect(input).toHaveValue('input');
  });
  it(`should show empty input if there are no term saved in localStorage`, async () => {
    const { input } = renderForm(false);

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    expect(input).toHaveValue('');
  });
  it(`should call handleSearch function with correct parameters when click on 'Search' button`, async () => {
    const { fn, input, searchButton } = renderForm(false);

    await userEvent.type(input, 'moon');
    await userEvent.click(searchButton);

    expect(fn).toHaveBeenCalledWith('moon');
  });
});
