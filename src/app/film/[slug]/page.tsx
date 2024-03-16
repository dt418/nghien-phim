import { type Metadata, type ResolvingMetadata } from "next";
import Image from "next/image";
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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getFilmBySlug } from "@/lib/fetcher";
import { type IMovieResponse } from "@/types/movie";

interface IFilmDetailParams {
  params: {
    slug: string | string[];
  };
}

type Props = {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  // fetch data
  const film = await getFilmBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: film.movie.name,
    description: film.movie.description,
    openGraph: {
      images: [film.movie.thumb_url, ...previousImages],
    },
  };
}
export default async function FilmDetail({ params }: IFilmDetailParams) {
  const { slug } = params;
  const res: IMovieResponse = await getFilmBySlug(slug);
  const { movie } = res;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Image
          src={movie.thumb_url}
          alt={movie.name}
          width={300}
          height={450}
          className="flex w-full md:w-1/3 rounded-lg"
        />
        <div className="detail flex flex-col w-full md:w-2/3">
          <h1 className="text-lg font-bold">{movie.name}</h1>
          <div className="flex flex-col">
            <div className="inline-flex text-sm font-light gap-2">
              <UsersRound className="w-4 h-4 flex-shrink-0" />
              Diễn viên: {movie.casts || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-light gap-2">
              <GalleryVerticalEnd className="w-4 h-4 flex-shrink-0" />
              Số tập: {movie.total_episodes || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-light gap-2">
              <Check className="w-4 h-4 flex-shrink-0" />
              Trạng thái: {movie.current_episode || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-light gap-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              Thời lượng: {movie.time || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-light gap-2">
              <CalendarDays className="w-4 h-4 flex-shrink-0" /> Năm phát hành:{" "}
              {movie.category[3]?.list?.map((item) => item.name).join(", ") ||
                "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-light gap-2">
              <Monitor className="w-4 h-4 flex-shrink-0" /> Chất lượng:{" "}
              {movie.quality || "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-light gap-2">
              <LibraryBig className="w-4 h-4 flex-shrink-0" />
              Thể loại:{" "}
              {movie.category[2]?.list?.map((item) => item.name).join(", ") ||
                "Đang cập nhật"}
            </div>
            <div className="inline-flex text-sm font-light gap-2">
              <Globe className="w-4 h-4 flex-shrink-0" /> Quốc gia:{" "}
              {movie.category[4]?.list.map((ct) => ct.name).join(", ") ||
                "Đang cập nhật"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-col w-full md:w-1/3">
          <h2>Xem phim</h2>
          <ul>
            {movie.episodes.map((ep) => (
              <li key={ep.server_name}>
                <p>{ep.server_name}</p>
                <ul className="flex flex-row flex-wrap gap-2 mt-3">
                  {ep.items.reverse().map((item) => (
                    <li key={item.slug}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">{item.name}</Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-full min-h-auto md:min-h-screen">
                          <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2 my-4 px-4">
                              <iframe
                                src={item.embed}
                                width="100%"
                                height="auto"
                                allowFullScreen
                                allow="autoplay; fullscreen"
                                className="min-w-full min-h-auto md:min-h-[calc(100vh-100px)]"
                              />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col w-full md:w-2/3 gap-2">
          <h2>Nội dung phim</h2>
          <div
            className="text-sm text-light"
            dangerouslySetInnerHTML={{ __html: movie.description }}
          ></div>
        </div>
      </div>
    </div>
  );
}
