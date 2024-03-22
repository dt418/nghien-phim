import { MetadataRoute } from "next";
import { Url } from "next/dist/shared/lib/router/router";

import { getFilms } from "@/lib/fetcher";
import { getURL } from "@/lib/utils";
import { THomePageProps } from "@/types/movie-list";

export default async function sitemap({ searchParams }: THomePageProps) {
  const routes: MetadataRoute.Sitemap = ["/"].map((route) => ({
    url: getURL(route),
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1
  }));
  const pageParam =
    typeof searchParams?.page === "string" && Number(searchParams?.page) > 0
      ? Number(searchParams?.page)
      : 1;
  const films = await getFilms(pageParam);
  const filmRoutes: MetadataRoute.Sitemap = films?.items?.map((film) => {
    const fullUrl: Url = getURL(`/film/${film.slug}`);
    return {
      url: fullUrl,
      lastModified: film.modified,
      changeFrequency: "daily",
    };
  });
  return [...routes, ...filmRoutes];
}
