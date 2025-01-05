import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon } from 'lucide-react';

import { IMovieBase } from '@/types/movie-list';

import { Card, CardContent } from '../card';

interface IFilmCardProps extends IMovieBase {
  isPriority?: boolean;
}
export const FilmCard = ({
  name,
  slug,
  thumb_url,
  original_name,
  isPriority = false,
}: IFilmCardProps) => {
  const filmLink = `/phim/${slug}`;
  return (
    <Link className="font-semibold" href={filmLink} title={name}>
      <Card className="group relative w-full max-w-sm overflow-hidden rounded-lg border shadow-sm">
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg transition-transform group-hover:scale-105">
          <Image
            className="rounded-t-lg object-cover"
            alt={name || original_name}
            style={{
              aspectRatio: '2/3',
              objectFit: 'cover',
            }}
            src={thumb_url}
            fill
            priority={isPriority}
            sizes="(min-width: 1480px) 209px, (min-width: 780px) calc(15.15vw - 12px), (min-width: 640px) calc(33.33vw - 34px), calc(50vw - 44px)"
          />
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <PlayIcon className="h-16 w-16 scale-50 rounded-full bg-accent bg-opacity-50 p-4 text-primary opacity-0 group-hover:scale-100 group-hover:opacity-100" />
          </div>
        </div>
        <CardContent className="absolute inset-x-0 bottom-0 left-0 z-0 flex h-1/2 flex-col justify-end bg-gradient-to-t from-green-700 to-transparent p-4 transition-all md:-bottom-20 md:opacity-0 md:group-hover:bottom-0 md:group-hover:opacity-100">
          <h3 className="line-clamp-1 block truncate pt-1 text-[15px] font-medium capitalize">
            {name}
          </h3>
          <p className="line-clamp-1 truncate text-sm font-normal">
            {original_name}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
