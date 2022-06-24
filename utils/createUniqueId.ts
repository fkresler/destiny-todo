const createUniqueId = (prefix: string): string => {
  const date = new Date();
  const uniqueId = `${prefix}-${date.toString()}`;

  return uniqueId;
};

export default createUniqueId;
