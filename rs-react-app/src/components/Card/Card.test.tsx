import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';

describe('Card', () => {
  it(`should render Card with given src and alt, heading and paragraph with given text`, () => {
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <Card
            source="/somesrc.img"
            title="Test"
            description="Testing rendering card"
            media_type="image"
            nasa_id="test_id"
          />
        </BrowserRouter>
      </Provider>
    );

    const image = screen.getByRole('img');
    const heading = screen.getByRole('heading');
    const description = screen.getByText('Testing rendering card');

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/somesrc.img');
    expect(image).toHaveAttribute('alt', 'Test');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test');

    expect(description).toBeInTheDocument();
  });
});
