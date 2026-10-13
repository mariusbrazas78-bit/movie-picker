
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
    console.error('Supabase klaida: trūksta URL arba rakto .env faile')
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }

  const { data, error } = await supabase
    .schema('public')
    .from('movies')
    .select(MOVIE_COLUMNS)
    .order('title', { ascending: true })

  if (error) {
    console.error('Supabase klaida:', error)
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }

  return (data ?? []).map(normalizeMovie)
}

export async function createMovie(movie) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }

  const { data, error } = await supabase
    .schema('public')
    .from('movies')
    .insert(movie)
    .select(MOVIE_COLUMNS)
    .single()

  if (error) {
    console.error('Supabase filmo sukūrimo klaida:', error)
    throw new Error(
      error.code === '42501'
        ? 'Neturite teisės pridėti filmų. Prisijunkite administratoriaus paskyra.'
        : 'Filmo pridėti nepavyko. Patikrinkite duomenis ir bandykite dar kartą.',
    )
  }

  return normalizeMovie(data)
}
