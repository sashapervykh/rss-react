import { screen } from '@testing-library/react';

export async function getFlyoutElements(number: number) {
  const text = await screen.findByText(`Selected items: ${number}`);
  const unselectButton = await screen.findByRole('button', {
    name: 'Unselect all',
  });
  const downloadButton = await screen.findByRole('button', {
    name: 'Download',
  });
  return { text, unselectButton, downloadButton };
}
