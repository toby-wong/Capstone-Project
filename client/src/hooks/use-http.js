import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (requestConfig) => {
    let result;

    setIsLoading(true);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

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
