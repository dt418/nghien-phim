"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination, PaginationProps } from "@nextui-org/react";

export default function CustomPagination(props: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(props.initialPage || 1);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
      router.push(`${pathname}?${params.toString()}`);
    } else {
      router.push("/");
    }
  }, [currentPage, pathname, router, searchParams]);

  const handleOnChange = (page: number) => {
    console.log("page", page);
    setCurrentPage(page);
  };
  return (
    <Pagination
      {...props}
      initialPage={currentPage}
      onChange={handleOnChange}
    />
  );
}
