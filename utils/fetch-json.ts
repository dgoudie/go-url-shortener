import { useCallback } from 'react';

export const useFetchJSON = <T = any>() => {
  const fetcher = useCallback(
    (...args: Parameters<typeof fetch>) =>
      fetch(...args).then((res) => {
        if (res.ok) {
          return res.json() as Promise<T>;
        } else {
          throw res;
        }
      }),
    []
  );

  return fetcher;
};
