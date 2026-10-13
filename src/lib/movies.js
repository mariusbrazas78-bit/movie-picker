import { isSupabaseConfigured, supabase } from './supabase.js'

const MOVIE_COLUMNS = 'id, title, genre, mood, description, release_year, rating'

function normalizeMovie(movie) {
  return {
    ...movie,
    release_year: Number(movie.release_year),
    rating: Number(movie.rating),
  }
}

export async function fetchMovies() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }

  const { data, error } = await supabase
    .schema('public')
    .from('movies')
    .select(MOVIE_COLUMNS)
    .order('title', { ascending: true })

  if (error) {
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }

  return (data ?? []).map(normalizeMovie)
}
