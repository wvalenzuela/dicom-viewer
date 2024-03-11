export const IsInvalid = (input) => {
  if (!input || input === undefined || input === null || input === 'null')
    return true;
  return false;
};
