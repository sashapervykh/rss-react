import type { Person } from '../models/types';

export const DataAddedToStore: Person = {
  name: 'Test',
  age: 20,
  email: 'test@test.com',
  password: 'test',
  gender: 'man',
  image: 'image.png',
  country: 'Russia',
};

export const CorrectInput = {
  name: 'Test',
  age: 20,
  image: new File(['image'], 'image.png', { type: 'image/png' }),
  email: 'test@test.com',
  country: 'Russia',
  password: '1!aA',
  confirmation: '1!aA',
  gender: 'man',
  agreement: true,
};

export const PartiallyIncorrectInput = {
  name: 'test',
  age: -20,
  image: new File(['image'], 'image.txt', { type: 'txt' }),
  email: 'test@test.ru',
  country: 'Russia',
  password: '1!aA',
  confirmation: '1aA',
  gender: '',
  agreement: undefined,
};

export const EmptyInput = {
  name: '',
  age: undefined,
  image: new File([''], '', { type: '' }),
  email: '',
  country: '',
  password: '',
  confirmation: '',
  gender: '',
  agreement: 'on',
};
