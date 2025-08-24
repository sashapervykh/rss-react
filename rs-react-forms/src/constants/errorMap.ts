export const ERRORS_MAP = {
  name: {
    required: 'You should specify a name.',
    firstLetter: 'First letter of the name should be capital',
  },
  age: {
    required: 'You should specify an age.',
    value: 'The age should be a positive number',
  },
  email: {
    required: 'Invalid email is specified',
  },
  country: {
    required: 'You should specify a country.',
  },
  password: {
    required: 'You should specify a password.',
  },
  confirmation: {
    required: 'You should confirm a password.',
    equal: 'The passwords do not match',
  },
  agreement: {
    required: 'You should confirm an agreement with Terms & Conditions.',
  },
  gender: {
    required: 'You should specify a gender.',
  },
  image: {
    type: 'You should upload jpeg or png file.',
    size: 'File size should be less than 1 Mb.',
  },
};
