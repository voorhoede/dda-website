import {
  dehydrate,
  HydrationBoundary,
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from '@tanstack/react-query';
import { type ComponentType, useRef } from 'react';

export type QueryClientProviderProps = {
  initialState: DehydratedState;
  initialParams: Record<string, string>;
  initialUrl: string;
};

export type QueryClientProviderComponentProps = Omit<
  QueryClientProviderProps,
  'initialState'
>;

export function withQueryClientProvider<T extends object>(
  WrappedComponent: ComponentType<T>,
) {
  return function WithQueryClientProviderComponent(
    props: T & QueryClientProviderProps,
  ) {
    const queryClientRef = useRef<QueryClient | null>(null);
    if (!queryClientRef.current) {
      queryClientRef.current = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            placeholderData: keepPreviousData,
          },
        },
      });
    }

    return (
      <QueryClientProvider client={queryClientRef.current}>
        <HydrationBoundary state={props.initialState}>
          <WrappedComponent {...props} />
        </HydrationBoundary>
      </QueryClientProvider>
    );
  };
}

export function getDehydratedState<T extends object>(
  key: [string, Record<string, string>, unknown?],
  data: T,
) {
  const queryClient = new QueryClient();

  queryClient.setQueryData(key, data);

  return dehydrate(queryClient);
}
