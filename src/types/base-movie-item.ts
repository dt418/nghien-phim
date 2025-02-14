export interface IMovieItemBase {
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  quality: string;
  language: string;
  time: string | null;
  director: string | null;
  casts: string | null;
}
