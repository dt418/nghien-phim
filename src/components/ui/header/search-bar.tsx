'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';

import { cn } from '@/lib/utils';

import { Button } from '../button';
import { Input } from '../input';

// Path for search results page
const SEARCH_PATH = '/tim-kiem';

// Define search bar variants using class-variance-authority
const searchBarVariants = cva('relative inline-flex w-full flex-row gap-2', {
  variants: {
    size: {
      default: 'md:w-80', // Default width on medium screens and up
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

/**
 * Props for the SearchBar component
 * @interface SearchBarProps
 * @extends {VariantProps<typeof searchBarVariants>}
 * @example
 * // Default usage
 * <SearchBar />
 *
 * // With custom className
 * <SearchBar className="my-4" />
 */
interface SearchBarProps extends VariantProps<typeof searchBarVariants> {
  className?: string;
}

/**
 * SearchBar component that provides search functionality
 * @param {SearchBarProps} props - Component props
 * @returns {JSX.Element} Search bar with input and submit button
 * @example
 * // Basic usage
 * <SearchBar />
 *
 * // With custom size
 * <SearchBar size="default" className="my-custom-class" />
 */
export default function SearchBar({
  className,
  size,
}: SearchBarProps = {}): JSX.Element {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Gets the current search term from the input
   * @returns {string} Trimmed and lowercase search term
   */
  const getSearchTerm = (): string => {
    return inputRef.current?.value?.trim().toLowerCase() ?? '';
  };

  /**
   * Creates a URL for the search results page
   * @param {string} term - Search term to include in URL
   * @returns {string} Formatted search URL with parameters
   */
  const createSearchUrl = (term: string): string => {
    const params = new URLSearchParams();
    if (term) {
      params.set('keyword', term);
    }
    return `${SEARCH_PATH}?${params.toString()}`;
  };

  /**
   * Handles form submission
   * @param {FormEvent<HTMLFormElement>} e - Form event
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchTerm = getSearchTerm();

    if (!searchTerm) {
      return;
    }

    push(createSearchUrl(searchTerm));
  };

  return (
    <form
      className={cn(searchBarVariants({ size }), className)}
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
        defaultValue={searchParams.get('keyword') ?? ''}
      />
      <Button type="submit" variant="secondary">
        Tìm
      </Button>
    </form>
  );
}
