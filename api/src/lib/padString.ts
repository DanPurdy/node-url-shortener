const padString = (
  str: string,
  length: number,
  padChar: string = '0',
): string => {
  if (str.length >= length) {
    return str;
  }

  let output = str;

  while (output.length < length) {
    output = padChar + output;
  }

  return output;
};

export default padString;
