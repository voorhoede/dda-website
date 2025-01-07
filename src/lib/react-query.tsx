import {
  dehydrate,
  HydrationBoundary,
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  type DehydratedState,
} from '@tanstack/react-query';
import { type ComponentType } from 'react';

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
  // Create a new QueryClient instance
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        placeholderData: keepPreviousData,
      },
    },
  });

  // Return a new component that includes the QueryClientProvider
  return function WithQueryClientProviderComponent(
    props: T & QueryClientProviderProps,
  ) {
    return (
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={props.initialState}>
          <WrappedComponent {...props} />
        </HydrationBoundary>
      </QueryClientProvider>
    );
  };
}

export function getDehydratedState<T extends object>(
  key: [string, Record<string, string>, number?],
  data: T,
) {
  const queryClient = new QueryClient();

  queryClient.setQueryData(key, data);

  return dehydrate(queryClient);
}
