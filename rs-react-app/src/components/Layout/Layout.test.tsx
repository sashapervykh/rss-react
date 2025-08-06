import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';

import { Layout } from './Layout';

describe('Layout', () => {
  it(`should render about link`, async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Layout />
      </MemoryRouter>
    );

    const link = await screen.findByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('About');
  });
  it(`should render home link`, async () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Layout />
      </MemoryRouter>
    );

    const link = await screen.findByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Home');
  });
});
