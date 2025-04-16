import type { LucideIcon } from 'lucide-react'

interface MovieStatProps {
  label: string
  icon: LucideIcon
  value?: string | number | null
}

export function MovieStat({ icon: Icon, label, value }: MovieStatProps) {
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

interface MovieStatsProps {
  stats: MovieStatProps[]
}

export function MovieStats({ stats }: MovieStatsProps) {
  return (
    <div className="grid gap-4 text-gray-300 sm:grid-cols-2">
      {stats.map(stat => (
        <MovieStat key={crypto.randomUUID()} {...stat} />
      ))}
    </div>
  )
}
