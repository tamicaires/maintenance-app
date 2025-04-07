import {
  useInfiniteQuery as useReactInfiniteQuery,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query"
import type { AxiosError } from "axios"

/**
 * Custom hook that wraps React Query's useInfiniteQuery with improved TypeScript support
 * and standardized error handling for paginated data
 */
export function useInfiniteQuery<TData = unknown, TError = AxiosError>(
  queryKey: unknown[],
  queryFn: (pageParam: any) => Promise<TData>,
  options?: Omit<UseInfiniteQueryOptions<TData, TError, TData, TData, unknown[]>, "queryKey" | "queryFn">,
): UseInfiniteQueryResult<TData, TError> {
  return useReactInfiniteQuery<TData, TError>({
    queryKey,
    queryFn,
    ...options,
  })
}

