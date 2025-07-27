import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { PageProvider } from '../../hooks/usePagination/PageProvider';

describe('Pagination', () => {
  const renderPagination = (max: number) => {
    render(
      <MemoryRouter>
        <PageProvider>
          <Pagination max={max} />
        </PageProvider>
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

  it(`should change page by pressing next`, async () => {
    const { next } = renderPagination(10);

    await userEvent.click(next);
    const pages = await screen.findByText('2 / 10');
    expect(pages).toBeInTheDocument();
  });
  it(`should change page by pressing prev`, async () => {
    const { prev, next } = renderPagination(10);

    await userEvent.click(next);
    await userEvent.click(prev);
    const pages = await screen.findByText('1 / 10');
    expect(pages).toBeInTheDocument();
  });
});
