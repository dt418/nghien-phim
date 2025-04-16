import {
  CalendarDays,
  Check,
  Clock,
  GalleryVerticalEnd,
  Globe,
  LibraryBig,
} from 'lucide-react'

import type { Movie } from '~/types/movie'

export function getMovieStats(movie: Movie) {
  return [
    {
      icon: Clock,
      label: 'Thời lượng',
      value: movie?.time,
    },
    {
      icon: GalleryVerticalEnd,
      label: 'Số tập',
      value: movie?.total_episodes,
    },
    {
      icon: Check,
      label: 'Trạng thái',
      value: movie?.current_episode,
    },
    {
      icon: CalendarDays,
      label: 'Năm',
      value: movie?.category[3]?.list?.map(item => item.name).join(', '),
    },
    {
      icon: LibraryBig,
      label: 'Thể loại',
      value: movie?.category[2]?.list?.map(item => item?.name).join(', '),
    },
    {
      icon: Globe,
      label: 'Quốc gia',
      value: movie?.category[4]?.list.map(ct => ct?.name).join(', '),
    },
  ]
}
