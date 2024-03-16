import Image from "next/image";
import Link from "next/link";
import { SquarePen } from "lucide-react";

import { IMovieBase } from "@/types/movie-list";

import { Card, CardContent } from "../card";

export const FilmCard = (props: IMovieBase) => {
  const { name, slug, thumb_url, modified, original_name } = props;
  const filmLink = `film/${slug}`;
  return (
    <Link className="font-semibold" href={filmLink} title={name}>
      <Card className="w-full max-w-sm rounded-lg border shadow-sm">
        <Image
          className="object-cover rounded-t-lg"
          alt="Film poster"
          height={600}
          width={400}
          style={{
            aspectRatio: "2/3",
            objectFit: "cover",
          }}
          src={thumb_url}
        />
        <CardContent className="p-4">
          <h3 className="text-lg font-bold line-clamp-1">{name}</h3>
          <p className="text-sm text-card-foreground line-clamp-1 font-light">
            {original_name}
          </p>
          <p className="flex text-sm text-card-foreground font-light">
            <SquarePen className="mr-1 h-4 w-4" />
            Cập nhật: {new Date(modified).toLocaleDateString("vi-VN")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
