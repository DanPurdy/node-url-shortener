const base36ToString = (shortUrl: string): number => {
  return parseInt(shortUrl, 36);
};

export default base36ToString;
