'use client';

import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../breadcrumb';

/**
 * Interface representing the breadcrumb navigation data
 */
export interface BreadcrumbData {
  /** Search keyword entered by the user */
  keyword: string;
  /** Current page number in pagination */
  currentPage: number;
  rawKeyword?: string;
}

/**
 * Props interface for SearchBreadcrumb component
 */
export interface SearchBreadcrumbProps {
  /** Data required to render the breadcrumb */
  breadcrumbData: BreadcrumbData;
}

/**
 * SearchBreadcrumb component displays navigation path for search results
 * @param {SearchBreadcrumbProps} props - Component props
 * @returns {JSX.Element} Rendered breadcrumb navigation
 */
export default function SearchBreadcrumb({
  breadcrumbData,
}: Readonly<SearchBreadcrumbProps>): JSX.Element {
  // Destructure props for easier access
  const { keyword, currentPage, rawKeyword } = breadcrumbData;

  return (
    <Breadcrumb className="py-4">
      <BreadcrumbList>
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Search results link */}
        <BreadcrumbItem>
          <BreadcrumbLink href={`/tim-kiem?keyword=${keyword}`}>
            Tìm kiếm: {rawKeyword}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Current page indicator */}
        <BreadcrumbItem>
          <BreadcrumbPage>Trang {currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
