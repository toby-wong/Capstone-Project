export const sendRequest = async (
  url,
  options = { method: "GET", headers: {}, body: null },
  setIsLoading = () => {}
) => {
  let result;

  setIsLoading(true);

  try {
    if (options.body) options.body = JSON.stringify(options.body);

    const response = await fetch(url, options);

    const data = await response.json();

    result = { status: response.status, data: data };
  } catch (err) {
    result = {
      status: null,
      data: `Unhandled error occurred: ${err.message}`,
    };
  }

  setIsLoading(false);

  return result;
};

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
