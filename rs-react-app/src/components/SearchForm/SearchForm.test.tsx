import { render, screen } from '@testing-library/react';
import { SearchForm } from './SearchForm';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  const renderForm = (disabled: boolean = false) =>
    render(
      <SearchForm handleSearch={() => Promise.resolve()} disabled={disabled} />
    );

  it(`should render disabled input and two buttons (search button is disabled, break button is active) when get disabled=true`, () => {
    renderForm(true);

    const input = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    const breakButton = screen.getByRole('button', { name: 'BREAK!' });

    expect(input).toBeInTheDocument();
    expect(input).toBeDisabled();
    expect(buttons).toHaveLength(2);
    expect(searchButton).toBeDisabled();
    expect(breakButton).not.toBeDisabled();
  });
  it(`should render active input and two active buttons when get disabled=false`, () => {
    renderForm(false);

    const input = screen.getByRole('textbox');
    const buttons = screen.getAllByRole('button');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    const breakButton = screen.getByRole('button', { name: 'BREAK!' });

    expect(input).toBeInTheDocument();
    expect(input).not.toBeDisabled();
    expect(buttons).toHaveLength(2);
    expect(searchButton).not.toBeDisabled();
    expect(breakButton).not.toBeDisabled();
  });
  it(`should update input value when user typing`, async () => {
    renderForm(false);

    const input = screen.getByRole('textbox');

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.type(input, 'input');

    expect(input).toHaveValue('input');
  });
  it(`should update input value when user typing`, async () => {
    renderForm(false);

    const input = screen.getByRole('textbox');

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.type(input, 'input');

    expect(input).toHaveValue('input');
  });
  it(`should update input value when user typing`, async () => {
    renderForm(false);

    const input = screen.getByRole('textbox');

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.type(input, 'input');

    expect(input).toHaveValue('input');
  });

  it(`should save entered search term in localStorage when pressing submit button`, async () => {
    renderForm(false);

    const input = screen.getByRole('textbox');

    if (!(input instanceof HTMLInputElement))
      throw new Error('The element is not an input');

    await userEvent.type(input, 'input');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(searchButton);
    const savedInput = localStorage.getItem('input');
    expect(savedInput).toBe('input');
  });
});
