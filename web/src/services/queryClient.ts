import { QueryClient } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 1,
      retryDelay: 1000 * 5, // 5 seconds
    },
  },
})

export { queryClient }
