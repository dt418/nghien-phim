"use client";
import React, { useCallback, useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
  const fetchIncrement = useCallback(async () => {
    if (slug) {
      try {
        await fetch("/api/increment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });
        // Handle response if needed
      } catch (error) {
        console.error("Fetch view count error.", error);
      }
    }
  }, [slug]);

  useEffect(() => {
    fetchIncrement();

    return () => {};
  }, [fetchIncrement]);

  return null;
};
