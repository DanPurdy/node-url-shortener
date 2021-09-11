export const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

const convertBase36 = (num: number): string => {
  if (num === 0) {
    return chars[0];
  }

  let result = '';

  while (num > 0) {
    result = `${chars[num % 36]}${result}`;
    num = Math.floor(num / 36);
  }
  return result;
};

export default convertBase36;
