export interface MovieItemBase {
  name: string
  slug: string
  created: string
  quality: string
  modified: string
  language: string
  thumb_url: string
  poster_url: string
  description: string
  time: string | null
  casts: string | null
  original_name: string
  total_episodes: number
  current_episode: string
  director: string | null
}
