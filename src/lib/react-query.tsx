import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ComponentType } from 'react';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function withQueryClientProvider<T extends object>(
  WrappedComponent: ComponentType<T>,
) {
  // Return a new component that includes the QueryClientProvider
  return function WithQueryClientProviderComponent(props: T) {
    return (
      <QueryClientProvider client={queryClient}>
        <WrappedComponent {...props} />
      </QueryClientProvider>
    );
  };
}
