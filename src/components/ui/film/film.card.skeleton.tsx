import { PlayIcon } from 'lucide-react'

import { Card, CardContent } from '../card'

export function FilmCardSkeleton() {
  return (
    <Card className="w-full rounded-lg border shadow-sm">
      <div className="group relative aspect-[2/3] overflow-hidden rounded-lg">
        <div
          className="w-[400] scale-100 animate-pulse rounded-t-lg bg-slate-200 object-cover transition-all group-hover:scale-105 dark:bg-slate-700"
          style={{
            aspectRatio: '2/3',
            objectFit: 'cover',
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <PlayIcon className="h-16 w-16 scale-0 rounded-full bg-green-500 bg-opacity-75 p-4 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100" />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-3 line-clamp-1 h-4 w-2/3 animate-pulse rounded-full bg-foreground text-lg font-bold"></h3>
        <p className="mb-2.5 line-clamp-1 h-2 animate-pulse rounded-full bg-muted-foreground text-sm font-normal text-card-foreground"></p>
      </CardContent>
    </Card>
  )
}
