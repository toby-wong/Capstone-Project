import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (
    url,
    options = { method: "GET", headers: {}, body: null }
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

  return [isLoading, sendRequest];
};

export default useHttp;
