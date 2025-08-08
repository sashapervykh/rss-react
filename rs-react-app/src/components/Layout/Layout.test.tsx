import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import { setupStore } from '../../store/store';

import { Layout } from './Layout';

describe('Layout', () => {
  it(`should render about link`, async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/home']}>
          <Layout />
        </MemoryRouter>
      </Provider>
    );

    const link = await screen.findByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('About');
  });
  it(`should render home link`, async () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/about']}>
          <Layout />
        </MemoryRouter>
      </Provider>
    );

    const link = await screen.findByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Home');
  });
});
