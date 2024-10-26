import Image from "next/image";
import Link from "next/link";
import { PlayIcon } from "lucide-react";

import { IMovieBase } from "@/types/movie-list";

import { Card, CardContent } from "../card";

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
      <Card className="w-full max-w-sm rounded-lg border shadow-sm relative overflow-hidden group">
        <div className="relative overflow-hidden aspect-[2/3] rounded-t-lg group-hover:scale-105 transition-transform">
          <Image
            className="object-cover rounded-t-lg"
            alt={name || original_name}
            style={{
              aspectRatio: "2/3",
              objectFit: "cover",
            }}
            src={thumb_url}
            fill
            priority={isPriority}
            sizes="(min-width: 1480px) 209px, (min-width: 780px) calc(15.15vw - 12px), (min-width: 640px) calc(33.33vw - 34px), calc(50vw - 44px)"
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <PlayIcon className="w-16 h-16 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 bg-accent bg-opacity-50 rounded-full p-4 text-primary" />
          </div>
        </div>
        <CardContent className="p-4 absolute z-0 inset-x-0 bottom-0 left-0 md:opacity-0 md:group-hover:opacity-100 transition-all h-1/2 flex flex-col justify-end bg-gradient-to-t from-green-700 to-transparent md:-bottom-20 md:group-hover:bottom-0">
          <h3 className="text-[15px] font-medium capitalize pt-1 block truncate line-clamp-1">
            {name}
          </h3>
          <p className="text-sm truncate line-clamp-1 font-normal">
            {original_name}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
