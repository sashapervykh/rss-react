import z from 'zod/v4';
import { isValidPassword } from '../utilities/isValidPassword';
import { ERRORS_MAP } from '../constants/errorMap';

export const FormSchema = z
  .object({
    name: z
      .string()
      .nonempty(ERRORS_MAP.name.required)
      .regex(/^[A-ZА-Я]/, ERRORS_MAP.name.firstLetter),
    age: z.coerce
      .number(ERRORS_MAP.age.required)
      .min(1, ERRORS_MAP.age.value)
      .nonnegative(ERRORS_MAP.age.value),
    image: z.instanceof(FileList).or(z.instanceof(File)),
    email: z.email({ message: ERRORS_MAP.email.required }),
    country: z.string().nonempty(ERRORS_MAP.country.required),
    password: z.string().nonempty(ERRORS_MAP.password.required),
    confirmation: z.string().nonempty(ERRORS_MAP.confirmation.required),
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
        message: ERRORS_MAP.confirmation.equal,
        path: ['confirmation'],
      });
    if (!val.agreement)
      ctx.addIssue({
        code: 'custom',
        message: ERRORS_MAP.agreement.required,
        path: ['agreement'],
      });
    if (!val.gender)
      ctx.addIssue({
        code: 'custom',
        message: ERRORS_MAP.gender.required,
        path: ['gender'],
      });
    const file = val.image instanceof FileList ? val.image.item(0) : val.image;
    if (!file || (file.type !== 'image/jpeg' && file.type !== 'image/png'))
      ctx.addIssue({
        code: 'custom',
        message: ERRORS_MAP.image.type,
        path: ['image'],
      });
    if (file && file.size > 1050000)
      ctx.addIssue({
        code: 'custom',
        message: ERRORS_MAP.image.type,
        path: ['image'],
      });
  });
