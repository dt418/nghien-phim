'use client'

import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery as useTanstackQuery, useSuspenseQuery } from '@tanstack/react-query'

import { APIError } from '~/lib/api/errors'

/**
 * Custom hook for data fetching using TanStack Query
 * Provides a standardized way to fetch data with automatic error handling,
 * caching, and retries.
 *
 * @param queryKey - Unique key for the query (used for caching)
 * @param queryFn - Function that fetches the data
 * @param options - Additional options for the query
 * @returns TanStack Query result with data, loading state, and error handling
 */
export function useQuery<TData, TError = APIError>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return useTanstackQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount: number, error: unknown) => {
      // Don't retry for 404 errors or after 3 failures
      if (error instanceof APIError && error.status === 404)
        return false
      return failureCount < 3
    },
    ...options,
  })
}

/**
 * Hook for data fetching with Suspense support
 * Use this when you want to leverage React Suspense for loading states
 *
 * @param queryKey - Unique key for the query (used for caching)
 * @param queryFn - Function that fetches the data
 * @param options - Additional options for the query
 * @returns TanStack Query result with data and error handling (no loading state)
 */
export function useSuspense<TData, TError = APIError>(
  queryKey: string[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, 'queryKey' | 'queryFn'>,
) {
  return useSuspenseQuery({
    queryKey,
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  })
}
