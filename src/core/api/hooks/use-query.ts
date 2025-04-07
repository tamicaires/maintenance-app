import { toast } from "@/hooks/use-toast"
import { QueryClient } from "@tanstack/react-query"

/**
 * Query client configuration class
 */
class QueryClientConfig {
  private client: QueryClient

  constructor() {
    this.client = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 5 * 60 * 1000, // 5 minutes
          gcTime: 10 * 60 * 1000, // 10 minutes
        },
        mutations: {
          onError: (error: unknown) => {
            const message = error instanceof Error ? error.message : "Erro inesperado"

            toast({
              title: "Error",
              description: message,
              variant: "destructive",
            })
          },
        },
      },
    })
  }

  getClient(): QueryClient {
    return this.client
  }
}

const queryClientConfig = new QueryClientConfig()
export const queryClient = queryClientConfig.getClient()

