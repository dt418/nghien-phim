import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Redis } from "@upstash/redis";
import {
  CalendarDays,
  Check,
  Clock,
  GalleryVerticalEnd,
  Globe,
  LibraryBig,
  Monitor,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getFilmBySlug } from "@/lib/fetcher";
import { stringToSlug, textTruncate } from "@/lib/stringUtils";
import { IFilmDetailPageProps } from "@/types/movie";

import { ReportView } from "./view";

const redis = Redis.fromEnv();
export const revalidate = 0;

// generate meta data
export async function generateMetadata(
  { params }: IFilmDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  // fetch data
  const film = await getFilmBySlug(slug);
  if (!film) {
    return notFound();
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: film?.movie?.name,
    description: textTruncate(String(film?.movie?.description)),
    openGraph: {
      description: textTruncate(String(film?.movie?.description)),
      images: [
        String(film?.movie?.poster_url || film?.movie?.thumb_url),
        ...previousImages,
      ],
    },
    twitter: {
      description: textTruncate(String(film?.movie?.description)),
      images: [
        String(film?.movie?.poster_url || film?.movie?.thumb_url),
        ...previousImages,
      ],
    },
  };
}

export default async function FilmDetail({ params }: IFilmDetailPageProps) {
  const { slug } = params;
  const res = await getFilmBySlug(slug);

  if (!res) {
    return notFound();
  }
  const views =
    (await redis.get<number>(["pageviews", "films", params.slug].join(":"))) ??
    0;

  const { movie } = res;
  return (
    <div className="flex flex-col gap-4">
      <ReportView slug={movie?.slug} />
      <div className="flex flex-col sm:flex-row gap-4">
        <Image
          src={movie?.thumb_url}
          alt={movie?.name}
          width={400}
          height={600}
          className="flex w-full md:w-1/4 rounded-lg aspect-[2/3] object-cover"
        />
        <div className="detail flex flex-col w-full md:w-auto">
          <h1 className="text-lg font-bold">{movie?.name}</h1>
          <div className="flex flex-col">
            <div className="inline-flex text-sm font-normal gap-2">
              <UsersRound className="w-4 h-4 flex-shrink-0" />
              Lượt xem:{" "}
              {Intl.NumberFormat("vi-VN", { notation: "compact" }).format(
                views
              ) || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-normal gap-2">
              <UsersRound className="w-4 h-4 flex-shrink-0" />
              Diễn viên: {movie?.casts || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-normal gap-2">
              <GalleryVerticalEnd className="w-4 h-4 flex-shrink-0" />
              Số tập: {movie?.total_episodes || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-normal gap-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              Trạng thái: {movie?.current_episode || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-normal gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              Thời lượng: {movie?.time || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-normal gap-2">
              <CalendarDays className="w-4 h-4 flex-shrink-0" /> Năm phát hành:{" "}
              {movie?.category[3]?.list?.map((item) => item.name).join(", ") ||
                "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-normal gap-2">
              <Monitor className="w-4 h-4 flex-shrink-0" /> Chất lượng:{" "}
              {movie?.quality || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-normal gap-2">
              <LibraryBig className="w-4 h-4 flex-shrink-0" />
              Thể loại:{" "}
              {movie?.category[2]?.list?.map((item) => item?.name).join(", ") ||
                "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-normal gap-2">
              <Globe className="w-4 h-4 flex-shrink-0" /> Quốc gia:{" "}
              {movie?.category[4]?.list.map((ct) => ct?.name).join(", ") ||
                "Đang cập nhật"}
            </div>
          </div>
          <div className="flex flex-col w-full md:w-auto gap-2 mt-4">
            <h2 className="text-lg font-semibold">Nội dung phim</h2>
            <div
              className="text-sm font-normal text"
              dangerouslySetInnerHTML={{ __html: movie?.description }}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex flex-col w-full">
          <h2 className="text-lg font-semibold">Xem phim</h2>
          <ul>
            {movie?.episodes?.map((ep) => (
              <li key={ep.server_name}>
                <p>{ep?.server_name}</p>
                <ul className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-12 gap-2 mt-2">
                  {ep?.items?.reverse()?.map((item) => (
                    <li key={item.slug}>
                      <Button asChild variant="ghost" className="w-full">
                        <Link
                          href={`/phim/${movie?.slug}/${stringToSlug(
                            ep?.server_name
                          )}/xem-phim/${item?.slug}`}
                        >
                          {item?.name}
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
