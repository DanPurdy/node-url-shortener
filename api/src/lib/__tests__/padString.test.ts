import padString from '../padString';

describe('padString', () => {
  it('should correctly pad a string with the pad character to the specified length', () => {
    const expectedLength = 8;
    const padChar = '0';
    const output = padString('', expectedLength, '0');

    expect(output.length).toBe(expectedLength);

    // If all the characters are the pad char the string should be completely emptied
    expect(output.replace(new RegExp(padChar, 'g'), '').length).toBe(0);
  });

  it('should correctly pad a string with the pad character to the specified length when the pad character is omitted', () => {
    const expectedLength = 8;
    const output = padString('', expectedLength);

    expect(output.length).toBe(expectedLength);
  });

  it('should not mutate a string that already matches the specified string length', () => {
    const expectedLength = 3;
    const expectedString = 'aaa';
    const output = padString(expectedString, expectedLength);

    expect(output.length).toBe(expectedLength);
    expect(output).toEqual(expectedString);
  });

  it('should not mutate a string that exceeds the specified string length', () => {
    const expectedLength = 3;
    const expectedString = 'aaaaaaa';
    const output = padString(expectedString, expectedLength);

    expect(output.length).not.toBe(expectedLength);
    expect(output.length).toBe(expectedString.length);
    expect(output).toEqual(expectedString);
  });
});
