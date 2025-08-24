import { screen } from '@testing-library/react';

interface Props {
  saveButtonDisabled?: boolean;
}
export function testForm(props: Props) {
  const field = [
    'name',
    'age',
    'email',
    'country',
    'password',
    'confirmation',
    'image',
    'man',
    'woman',
    'agreement',
  ];

  for (const key of field) {
    const line = screen.getByTestId(key);
    expect(line).toBeInTheDocument();
  }
  const cancelButton = screen.getByRole('button', { name: 'Cancel' });
  const saveButton = screen.getByRole('button', { name: 'Save' });
  expect(cancelButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
  if (props.saveButtonDisabled) expect(saveButton).toBeDisabled();
}
