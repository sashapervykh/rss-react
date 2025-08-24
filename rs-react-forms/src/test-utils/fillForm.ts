import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CorrectInput } from './mockedData';
import type { FormDataType } from '../models/types';

export async function fillFormCorrectly() {
  const field: (keyof FormDataType)[] = [
    'name',
    'age',
    'email',
    'country',
    'password',
    'confirmation',
  ];

  for (const key of field) {
    const line = screen.getByTestId(key);
    if (
      CorrectInput[key] instanceof File ||
      CorrectInput[key] instanceof FileList ||
      !CorrectInput[key]
    )
      continue;

    await userEvent.type(line, CorrectInput[key].toString());
  }

  const man = screen.getByTestId('man');
  await userEvent.click(man);

  const agreement = screen.getByTestId('agreement');
  await userEvent.click(agreement);

  const image = screen.getByTestId('image');
  await userEvent.upload(
    image,
    new File(['image'], 'image.png', { type: 'image/png' })
  );
}
