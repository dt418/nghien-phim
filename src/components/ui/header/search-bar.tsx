'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '../input';

const DEBOUNCE_DELAY = 300;
const SEARCH_PATH = '/tim-kiem';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const updateSearchParams = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (!term) {
      params.delete('keyword');
    } else {
      params.set('keyword', term.trim().toLowerCase());
    }

    return params;
  };

  const constructSearchUrl = (params: URLSearchParams) => {
    if (!params.has('keyword')) {
      return '/'; // Return home path when keyword is empty
    }
    const isSearchPage = pathname.includes(SEARCH_PATH);
    const basePath = isSearchPage ? '' : SEARCH_PATH;
    return `${basePath}${pathname}?${params.toString()}`;
  };

  const handleSearchDebounced = useDebouncedCallback((value: string) => {
    const params = updateSearchParams(value);
    const searchUrl = constructSearchUrl(params);
    replace(searchUrl);
  }, DEBOUNCE_DELAY);

  return (
    <form
      className="relative flex w-full flex-row md:w-80"
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        startIcon={<Search />}
        type="search"
        placeholder="Tìm kiếm phim..."
        className="w-full"
        onChange={(event) => handleSearchDebounced(event.target.value)}
        aria-label="Search input"
      />
    </form>
  );
}
