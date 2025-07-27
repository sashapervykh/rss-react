import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { MemoryRouter } from 'react-router';

describe('Pagination', () => {
  const renderPagination = (max: number) => {
    render(
      <MemoryRouter>
        <Pagination max={max} />
      </MemoryRouter>
    );
    return {
      prev: screen.getByRole('button', { name: '<' }),
      pages: screen.getByText(`1 / ${max}`),
      next: screen.getByRole('button', { name: '>' }),
    };
  };
  it(`should render div and two buttons (one disabled and one active)`, () => {
    const { prev, pages, next } = renderPagination(10);

    expect(prev).toBeInTheDocument();
    expect(prev).toBeDisabled();
    expect(next).toBeInTheDocument();
    expect(next).not.toBeDisabled();
    expect(pages).toBeInTheDocument();
    expect(pages).toHaveTextContent('1 / 10');
  });
  it(`should render div and two disabled buttons`, () => {
    const { prev, pages, next } = renderPagination(1);

    expect(prev).toBeInTheDocument();
    expect(prev).toBeDisabled();
    expect(next).toBeInTheDocument();
    expect(next).toBeDisabled();
    expect(pages).toBeInTheDocument();
    expect(pages).toHaveTextContent('1 / 1');
  });
});
