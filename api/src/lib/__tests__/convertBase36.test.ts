import convertBase36, { chars } from '../convertBase36';

describe('convertBase36', () => {
  it('should correctly convert the number 0 to a base36 string', () => {
    const output = convertBase36(0);

    expect(output).toBe(chars[0]);
  });

  it('should correctly convert the number 36 to a base 36 string', () => {
    const output = convertBase36(36);

    expect(output).toBe('10');
  });

  it('should correctly convert the number 35 to a base 36 string', () => {
    const output = convertBase36(35);

    expect(output).toBe(chars[35]);
  });

  it('should correctly convert 36^8 to a base36 format string of length 8', () => {
    const exponent = 8;
    const number = 36 ** exponent - 1;

    const output = convertBase36(number);

    expect(output.length).toEqual(exponent);
    expect(output).toBe('zzzzzzzz');
  });
});
