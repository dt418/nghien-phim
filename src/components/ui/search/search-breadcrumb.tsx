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

interface BreadcrumbData {
  keyword: string;
  currentPage: number;
}
interface SearchBreadcrumbProps {
  breadcrumbData: BreadcrumbData;
}
export default function SearchBreadcrumb({
  breadcrumbData,
}: Readonly<SearchBreadcrumbProps>) {
  const { keyword, currentPage } = breadcrumbData;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">
            Tìm kiếm: {keyword}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Trang {currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
