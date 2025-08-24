import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import { DataAddedToStore } from '../../test-utils/mockedData';
import type { Person } from '../../models/types';

describe('Card', () => {
  it(`should render card with the given parameters`, () => {
    render(<Card elem={DataAddedToStore} isNew={false} />);
    const keys: (keyof Person)[] = [
      'name',
      'age',
      'email',
      'password',
      'gender',
      'image',
    ];

    for (const key of keys) {
      if (key === 'image') continue;
      const field = screen.getByText(key[0].toUpperCase() + key.slice(1) + ':');
      const fieldContent = screen.getByText(DataAddedToStore[key]);
      expect(field).toBeInTheDocument();
      expect(fieldContent).toBeInTheDocument();
    }
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'image.png');
  });
  it(`should render card with newly-added class if isNew props is true`, () => {
    render(<Card elem={DataAddedToStore} isNew={true} />);

    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card.className).toContain('newly-added');
  });
});
