export function isValidPassword(val: string) {
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
