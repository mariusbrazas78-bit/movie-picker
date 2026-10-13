
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

export async function updateMovie(id, movie) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }

  const { data, error } = await supabase
    .schema('public')
    .from('movies')
    .update(movie)
    .eq('id', id)
    .select(MOVIE_COLUMNS)
    .single()

  if (error) {
    console.error('Supabase filmo atnaujinimo klaida:', error)
    throw new Error(
      error.code === '42501'
        ? 'Neturite teisės redaguoti filmų.'
        : 'Filmo atnaujinti nepavyko. Patikrinkite duomenis ir bandykite dar kartą.',
    )
  }

  return normalizeMovie(data)
}

export async function deleteMovie(id) {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }

  const { data, error } = await supabase
    .schema('public')
    .from('movies')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle()

  if (error) {
    console.error('Supabase filmo ištrynimo klaida:', error)
    throw new Error(
      error.code === '42501'
        ? 'Neturite teisės ištrinti filmų.'
        : 'Filmo ištrinti nepavyko. Bandykite dar kartą.',
    )
  }

  if (!data) {
    throw new Error('Filmas nerastas arba neturite teisės jo ištrinti.')
  }
}
