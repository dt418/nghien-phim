'use client';

import { DateTime } from 'luxon';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { IMovieSearchItem } from '@/types/movie-list';

import { Badge } from '../badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';

export interface SearchMovieTableProps {
  data: IMovieSearchItem[];
}
function SearchMovieTable({ data }: Readonly<SearchMovieTableProps>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên</TableHead>
          <TableHead>Tình Trạng</TableHead>
          <TableHead>Định dạng</TableHead>
          <TableHead>Năm</TableHead>
          <TableHead>Quốc gia</TableHead>
          <TableHead>Ngày cập nhật</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((film) => (
          <TableRow key={film.id}>
            <TableCell>
              <div className="flex flex-row items-center gap-4">
                <Image
                  src={film.poster_url}
                  alt={film.original_name}
                  width={48}
                  height={67}
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
            </TableCell>
            <TableCell>
              <Badge className="text-green-600" variant={'secondary'}>
                {film.current_episode}
              </Badge>
            </TableCell>
            <TableCell>
              {film.total_episodes === 1 ? 'Phim lẻ' : 'Phim bộ'}
            </TableCell>
            <TableCell>{DateTime.fromISO(film.created).year ?? null}</TableCell>
            <TableCell>Đang cập nhật</TableCell>
            <TableCell>
              {DateTime.fromISO(film.modified)
                .setLocale('vi')
                .toLocaleString(DateTime.DATETIME_MED) ?? null}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SearchMovieTable;
