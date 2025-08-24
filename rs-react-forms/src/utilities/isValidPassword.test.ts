import { isValidPassword } from './isValidPassword';

describe('isValidPassword', () => {
  it(`should return false for good password`, () => {
    expect(isValidPassword('1!aA')).toBe(false);
  });
  it(`should return full warning for bad password`, () => {
    expect(isValidPassword('.')).toBe(
      'Password should include one capital English letter, one lowercase English letter, one number, one of the special symbols (i.e. !@#$&?)'
    );
  });
});
