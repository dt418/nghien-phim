'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { isImageUrl } from '@/lib/stringUtils';
import { formatDate, getFilmFormat } from '@/lib/utils';
import { IMovieItemBase } from '@/types/base-movie-item';
import { IMovieSearchItem } from '@/types/search';

import { Badge } from '../badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';

const TABLE_HEADERS = [
  'Tên',
  'Tình Trạng',
  'Định dạng',
  'Năm',
  'Quốc gia',
  'Ngày cập nhật',
] as const;

interface FilmTitleCellProps<T extends IMovieSearchItem | IMovieItemBase> {
  film: T;
}

export interface SearchMovieTableProps<
  T extends IMovieSearchItem | IMovieItemBase,
> {
  data: T[];
}

const FilmTitleCell = <T extends IMovieSearchItem | IMovieItemBase>({
  film,
}: FilmTitleCellProps<T>) => (
  <div className="flex flex-row items-center gap-4">
    <Image
      src={
        isImageUrl(film.poster_url) ? film.poster_url : '/film-placeholder.png'
      }
      alt={film.original_name}
      width={80}
      height={120}
      className="aspect-auto"
    />
    <div>
      <Link href={`/phim/${film.slug}`}>
        <h3 className="font-bold text-lime-500">{film.name}</h3>
        <h4 className="font-sans text-xs font-extralight">
          {film.original_name}
        </h4>
      </Link>
    </div>
  </div>
);

function SearchMovieTable<T extends IMovieSearchItem | IMovieItemBase>({
  data,
}: Readonly<SearchMovieTableProps<T>>) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="uppercase">
          {TABLE_HEADERS.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((film) => (
          <TableRow key={film.slug}>
            <TableCell className="min-w-[250px] md:w-1/3">
              <FilmTitleCell film={film} />
            </TableCell>
            <TableCell className="min-w-[100px]">
              <Badge
                className="text-center text-green-600"
                variant={'secondary'}
              >
                {film.current_episode}
              </Badge>
            </TableCell>
            <TableCell className="min-w-[150px]">
              {getFilmFormat(film.total_episodes)}
            </TableCell>
            <TableCell>{formatDate(film.created, 'year')}</TableCell>
            <TableCell className="truncate">Đang cập nhật</TableCell>
            <TableCell className="min-w-[200px]">
              {formatDate(film.modified, 'full')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SearchMovieTable;
