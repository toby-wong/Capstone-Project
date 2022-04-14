export const getDate = (dateTimeStr) => {
  const [date, time] = dateTimeStr.split(" ");
  const [day, month, year] = date.split("/");
  const [hour, minute] = time.split(":");

  return new Date(year, month - 1, day, hour, minute);
};

export const convertImagesToBase64 = async (imageFiles) => {
  const getBase64 = (imageFile) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function () {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        resolve({ image_data: base64String });
      };

      reader.readAsDataURL(imageFile);
    });

  const promises = [];
  for (let i = 0; i < imageFiles.length; ++i) {
    promises.push(getBase64(imageFiles[i]));
  }

  return await Promise.all(promises);
};

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
    if (response.status === 204) {
      setIsLoading(false);
      return { status: response.status };
    }

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
