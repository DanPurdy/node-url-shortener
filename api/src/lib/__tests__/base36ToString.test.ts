import base36ToString from '../base36ToString';

describe('base36ToString', () => {
  it('should correctly change a base 36 string to the correct base 10 number', () => {
    const exponent = 8;
    const expectedNumber = 36 ** exponent - 1;
    const base36String = new Array(exponent).fill('z').join('');

    const output = base36ToString(base36String);

    expect(output).toBe(expectedNumber);
  });

  it('should correctly change a base 36 string to 0', () => {
    const exponent = 8;
    const base36String = new Array(exponent).fill('0').join('');

    const output = base36ToString(base36String);

    expect(output).toBe(0);
  });

  it('should correctly change a base 36 padded string to 1', () => {
    const base36String = '00000001';

    const output = base36ToString(base36String);

    expect(output).toBe(1);
  });
});
