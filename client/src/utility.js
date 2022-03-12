export const containsLower = (str) => {
  return /[a-z]/.test(str);
};

export const containsUpper = (str) => {
  return /[A-Z]/.test(str);
};

export const containsDigit = (str) => {
  return /[0-9]/.test(str);
};

export const containsOnlyDigis = (str) => {
  return /^[0-9]+$/.test(str);
};
