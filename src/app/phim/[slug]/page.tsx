import { Redis } from '@upstash/redis';
import {
  CalendarDays,
  Check,
  Clock,
  GalleryVerticalEnd,
  Globe,
  LibraryBig,
  Monitor,
  UsersRound,
} from 'lucide-react';
import { type Metadata, type ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getFilmBySlug } from '@/lib/fetcher';
import { stringToSlug, textTruncate } from '@/lib/stringUtils';
import { IFilmDetailPageProps } from '@/types/movie';

import { ReportView } from './view';

const redis = Redis.fromEnv();

export const dynamic = 'force-static';
export const revalidate = 3600;
// generate meta data
export async function generateMetadata(
  { params }: IFilmDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  // fetch data
  const film = await getFilmBySlug(slug);
  if (!film) {
    notFound();
  }

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: film?.movie?.name,
    description: textTruncate(String(film?.movie?.description)),
    openGraph: {
      description: textTruncate(String(film?.movie?.description)),
      images: [
        String(film?.movie?.poster_url ?? film?.movie?.thumb_url),
        ...previousImages,
      ],
    },
    twitter: {
      description: textTruncate(String(film?.movie?.description)),
      images: [
        String(film?.movie?.poster_url ?? film?.movie?.thumb_url),
        ...previousImages,
      ],
    },
  };
}
export default async function FilmDetail({
  params,
}: Readonly<IFilmDetailPageProps>) {
  const slug = (await params)?.slug;
  if (!slug) {
    notFound();
  }
  const res = await getFilmBySlug(slug);

  if (!res) {
    notFound();
  }
  const views =
    (await redis.get<number>(['pageviews', 'films', slug].join(':'))) ?? 0;

  const { movie } = res;
  return (
    <div className="flex flex-col gap-4">
      <ReportView slug={movie?.slug} />
      <div className="flex flex-col gap-4 sm:flex-row">
        <Image
          src={movie?.thumb_url}
          alt={movie?.name}
          width={400}
          height={600}
          className="flex aspect-[2/3] w-full rounded-lg object-cover md:w-1/4"
        />
        <div className="detail flex w-full flex-col md:w-auto">
          <h1 className="text-lg font-bold">{movie?.name}</h1>
          <div className="flex flex-col">
            <div className="inline-flex gap-2 text-sm font-normal">
              <UsersRound className="h-4 w-4 flex-shrink-0" />
              Lượt xem:{' '}
              {Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(
                views
              ) ?? 'Đang cập nhật'}
            </div>
            <div className="inline-flex gap-2 text-sm font-normal">
              <UsersRound className="h-4 w-4 flex-shrink-0" />
              Diễn viên: {movie?.casts ?? 'Đang cập nhật'}
            </div>
            <div className="inline-flex gap-2 text-sm font-normal">
              <GalleryVerticalEnd className="h-4 w-4 flex-shrink-0" />
              Số tập: {movie?.total_episodes ?? 'Đang cập nhật'}
            </div>
            <div className="inline-flex gap-2 text-sm font-normal">
              <Check className="h-4 w-4 flex-shrink-0" />
              Trạng thái: {movie?.current_episode ?? 'Đang cập nhật'}
            </div>
            <div className="inline-flex gap-2 text-sm font-normal">
              <Clock className="h-4 w-4 flex-shrink-0" />
              Thời lượng: {movie?.time ?? 'Đang cập nhật'}
            </div>
            <div className="inline-flex gap-2 text-sm font-normal">
              <CalendarDays className="h-4 w-4 flex-shrink-0" /> Năm phát hành:{' '}
              {movie?.category[3]?.list?.map((item) => item.name).join(', ') ??
                'Đang cập nhật'}
            </div>
            <div className="inline-flex gap-2 text-sm font-normal">
              <Monitor className="h-4 w-4 flex-shrink-0" /> Chất lượng:{' '}
              {movie?.quality ?? 'Đang cập nhật'}
            </div>
            <div className="inline-flex gap-2 text-sm font-normal">
              <LibraryBig className="h-4 w-4 flex-shrink-0" />
              Thể loại:{' '}
              {movie?.category[2]?.list?.map((item) => item?.name).join(', ') ??
                'Đang cập nhật'}
            </div>
            <div className="inline-flex gap-2 text-sm font-normal">
              <Globe className="h-4 w-4 flex-shrink-0" /> Quốc gia:{' '}
              {movie?.category[4]?.list.map((ct) => ct?.name).join(', ') ??
                'Đang cập nhật'}
            </div>
          </div>
          <div className="mt-4 flex w-full flex-col gap-2 md:w-auto">
            <h2 className="text-lg font-semibold">Nội dung phim</h2>
            <div
              className="text text-sm font-normal"
              dangerouslySetInnerHTML={{ __html: movie?.description }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col">
          <h2 className="text-lg font-semibold">Xem phim</h2>
          <ul>
            {movie?.episodes?.map((ep) => (
              <li key={ep.server_name}>
                <p>{ep?.server_name}</p>
                <ul className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8 md:grid-cols-12">
                  {ep?.items?.toReversed()?.map((item) => (
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
