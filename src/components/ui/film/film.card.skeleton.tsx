import { PlayIcon } from "lucide-react";

import { Card, CardContent } from "../card";

export const FilmCardSkeleton = () => {
  return (
    <Card className="w-full max-w-sm rounded-lg border shadow-sm">
      <div className="relative group overflow-hidden aspect-[2/3] rounded-lg">
        <div
          className="object-cover rounded-t-lg transition-all scale-100 group-hover:scale-105 w-[400] bg-slate-200 dark:bg-slate-700 animate-pulse"
          style={{
            aspectRatio: "2/3",
            objectFit: "cover",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          <PlayIcon className="w-16 h-16 scale-0 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 bg-green-500 bg-opacity-75 rounded-full p-4" />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="h-4 bg-foreground rounded-full w-2/3 mb-3 animate-pulse text-lg font-bold line-clamp-1"></h3>
        <p className="text-sm text-card-foreground line-clamp-1 font-light h-2 bg-muted-foreground rounded-full mb-2.5 animate-pulse"></p>
      </CardContent>
    </Card>
  );
};
