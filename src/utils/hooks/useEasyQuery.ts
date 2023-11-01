import { useQuery } from '@tanstack/react-query';

export type Result<T> =
  | { status: 'isLoading' }
  | { status: 'isError'; error: unknown }
  | { status: 'isSuccess'; data: T };

export const useEasyQuery = <T>(
  key: string[],
  query: () => Promise<T>,
): Result<T> => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: key,
    queryFn: () => query(),
  });

  if (isLoading) return { status: 'isLoading' };
  if (isError) return { status: 'isError', error };
  if (!data) return { status: 'isError', error };
  return {
    status: 'isSuccess',
    data,
  };
};
