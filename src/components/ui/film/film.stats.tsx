import type { LucideIcon } from 'lucide-react'

interface IMovieStatProps {
  label: string
  icon: LucideIcon
  value?: string | number | null
}

export function MovieStat({ icon: Icon, label, value }: IMovieStatProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-gray-400" />
      <span>
        {label}
        :
        {value ?? 'Đang cập nhật'}
      </span>
    </div>
  )
}

interface IMovieStatsProps {
  stats: IMovieStatProps[]
}

export function MovieStats({ stats }: IMovieStatsProps) {
  return (
    <div className="grid gap-4 text-gray-300 sm:grid-cols-2">
      {stats.map(stat => (
        <MovieStat key={crypto.randomUUID()} {...stat} />
      ))}
    </div>
  )
}
