import { MetadataRoute } from "next";

import getURL from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: getURL('/'),
      lastModified: new Date(),
    },
  ];
}
