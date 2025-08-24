import { ERRORS_MAP } from '../constants/errorMap';
import {
  CorrectInput,
  EmptyInput,
  PartiallyIncorrectInput,
} from '../test-utils/mockedData';
import { FormSchema } from './schema';

describe('Schema', () => {
  it('should have success status for correct input', () => {
    const result = FormSchema.safeParse(CorrectInput);
    expect(result.success).toBe(true);
  });
  it('should return correct messages for empty input', () => {
    const result = FormSchema.safeParse(EmptyInput);
    expect(result.success).toBe(false);

    const nameErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'name')
      .map((issue) => issue.message);
    expect(nameErrors).toContain(ERRORS_MAP.name.required);

    const ageErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'age')
      .map((issue) => issue.message);
    expect(ageErrors).toContain(ERRORS_MAP.age.required);

    const countryErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'country')
      .map((issue) => issue.message);
    expect(countryErrors).toContain(ERRORS_MAP.country.required);

    const passwordErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'password')
      .map((issue) => issue.message);
    expect(passwordErrors).toContain(ERRORS_MAP.password.required);

    const confirmationErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'confirmation')
      .map((issue) => issue.message);
    expect(confirmationErrors).toContain(ERRORS_MAP.confirmation.required);
  });
  it('should return correct messages for partially incorrect input', () => {
    const result = FormSchema.safeParse(PartiallyIncorrectInput);
    expect(result.success).toBe(false);

    const agreementErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'agreement')
      .map((issue) => issue.message);
    expect(agreementErrors).toContain(ERRORS_MAP.agreement.required);

    const nameErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'name')
      .map((issue) => issue.message);
    expect(nameErrors).toContain(ERRORS_MAP.name.firstLetter);

    const ageErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'age')
      .map((issue) => issue.message);
    expect(ageErrors).toContain(ERRORS_MAP.age.value);

    const confirmationErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'confirmation')
      .map((issue) => issue.message);
    expect(confirmationErrors).toContain(ERRORS_MAP.confirmation.equal);

    const genderErrors = result.error?.issues
      .filter((issue) => issue.path[0] === 'gender')
      .map((issue) => issue.message);
    expect(genderErrors).toContain(ERRORS_MAP.gender.required);

    const imageError = result.error?.issues
      .filter((issue) => issue.path[0] === 'image')
      .map((issue) => issue.message);
    expect(imageError).toContain(ERRORS_MAP.image.type);
  });
});
