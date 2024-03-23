"use client";
import React, { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchIncrement = async () => {
      if (slug) {
        try {
          await fetch("/api/increment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug }),
            signal: signal,
          });
          // Handle response if needed
        } catch (error) {
          console.error('Fetch view count error.',error);
          return;
        }
      }
    };

    fetchIncrement();

    return () => {
      abortController.abort();
    };
  }, [slug]);

  return null;
};
