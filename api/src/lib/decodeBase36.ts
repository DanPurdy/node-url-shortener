const decodeBase36 = (shortUrl: string): number => {
  return parseInt(shortUrl, 36);
};

export default decodeBase36;
