import z from 'zod/v4';

export const FormSchema = z
  .object({
    name: z
      .string()
      .nonempty('You should specify a name.')
      .regex(/^[A-ZА-Я]/, 'First letter of the name should be capital'),
    age: z.coerce
      .number('You should specify an age.')
      .min(1, 'You should specify an age.')
      .nonnegative('The age should be a positive number'),
    image: z.instanceof(FileList).or(z.instanceof(File)),
    email: z
      .email('Invalid email is specified.')
      .nonempty('Your email is required!'),
    country: z.string().nonempty('You should specify a country.'),
    password: z.string().nonempty('You should specify a password.'),
    confirmation: z.string().nonempty('You should confirm a password.'),
    gender: z.enum(['man', 'woman']).or(z.literal('')).or(z.undefined()),
    agreement: z.boolean().or(z.literal('on')).or(z.undefined()),
  })
  .superRefine((val, ctx) => {
    const validPasswordCheck = isValidPassword(val.password);
    if (validPasswordCheck)
      ctx.addIssue({
        code: 'custom',
        message: validPasswordCheck,
        path: ['password'],
      });
    if (val.password !== val.confirmation)
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match',
        path: ['confirmation'],
      });
    if (!val.agreement)
      ctx.addIssue({
        code: 'custom',
        message: 'You should confirm an agreement with Terms & Conditions.',
        path: ['agreement'],
      });
    if (!val.gender)
      ctx.addIssue({
        code: 'custom',
        message: 'You should specify a gender.',
        path: ['gender'],
      });
    const file = val.image instanceof FileList ? val.image.item(0) : val.image;
    if (!file || (file.type !== 'image/jpeg' && file.type !== 'image/png'))
      ctx.addIssue({
        code: 'custom',
        message: 'You should upload jpeg or png file.',
        path: ['image'],
      });
    if (file && file.size > 1050000)
      ctx.addIssue({
        code: 'custom',
        message: 'File size should be less than 1 Mb.',
        path: ['image'],
      });
  });

function isValidPassword(val: string) {
  const missedSymbols = [];

  if (!/[A-Z]+/.test(val)) {
    missedSymbols.push('one capital English letter');
  }
  if (!/[a-z]+/.test(val)) {
    missedSymbols.push('one lowercase English letter');
  }
  if (!/[0-9]+/.test(val)) {
    missedSymbols.push('one number');
  }
  if (!/[!@#$&?]+/.test(val)) {
    missedSymbols.push('one of the special symbols (i.e. !@#$&?)');
  }

  if (missedSymbols.length !== 0) {
    return `Password should include ${missedSymbols.join(', ')}`;
  }
  return false;
}
