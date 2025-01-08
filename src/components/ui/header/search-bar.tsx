'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';

import { Button } from '../button';
import { Input } from '../input';

/** Path for the search page */
const SEARCH_PATH = '/tim-kiem';

/**
 * SearchBar component that handles search functionality
 * Allows users to search and updates URL with search parameters
 * @returns React component
 */
export default function SearchBar(): JSX.Element {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Updates search parameters based on the search term
   * @param term - The search term to update params with
   * @returns Updated URLSearchParams object
   */
  const updateSearchParams = (term: string): URLSearchParams => {
    const params = new URLSearchParams(searchParams);

    if (!term) {
      params.delete('keyword');
      return params;
    }

    params.set('keyword', term.trim().toLowerCase());
    return params;
  };

  /**
   * Constructs the search URL based on current pathname and search parameters
   * @param params - URLSearchParams object containing search parameters
   * @returns Constructed search URL string
   */
  const constructSearchUrl = (params: URLSearchParams): string => {
    if (!params.has('keyword')) {
      return pathname;
    }

    const isSearchPage = pathname.includes(SEARCH_PATH);
    const basePath = isSearchPage ? '' : SEARCH_PATH;
    return `${basePath}${pathname}?${params}`;
  };

  /**
   * Handles form submission
   * @param e - Form submission event
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchTerm = inputRef.current?.value ?? '';
    const params = updateSearchParams(searchTerm);
    const searchUrl = constructSearchUrl(params);
    replace(searchUrl);
  };

  return (
    <form
      className="relative flex w-full flex-row gap-2 md:w-80"
      onSubmit={handleSubmit}
      role="search"
    >
      <Input
        ref={inputRef}
        startIcon={<Search />}
        type="search"
        name="search"
        placeholder="Tìm kiếm phim..."
        className="w-full"
        aria-label="Search input"
      />
      <Button type="submit" variant="secondary">
        Tìm
      </Button>
    </form>
  );
}
