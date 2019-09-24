import { useEffect, useState } from 'react';

const useHttpErrorHandler = httpClient => {
  const [ error, setError ] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use(request => {
      setError(null);
      return request;
    });

    const responseInterceptor = httpClient.interceptors.response.use(response => response, error => {
      setError(error);
    });

    useEffect(() => {
      return () => {
        httpClient.interceptors.request.eject(requestInterceptor);
        httpClient.interceptors.response.eject(responseInterceptor);
      };
    }, [httpClient, requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    }

    return [ error, errorConfirmedHandler ];
};

export default useHttpErrorHandler;