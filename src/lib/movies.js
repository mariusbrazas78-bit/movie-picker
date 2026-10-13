
import { isSupabaseConfigured, supabase } from './supabase.js'

const MOVIE_COLUMNS = 'id, title, genre, mood, description, release_year, rating'

function getErrorMessage(error, fallback) {
  return error instanceof Error && error.message
    ? error.message
    : fallback
}

function normalizeMovie(movie) {
  return {
    ...movie,
    release_year: Number(movie.release_year),
    rating: Number(movie.rating),
  }
}

function requireSupabase() {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }
  return supabase
}

export async function fetchMovies(client = requireSupabase()) {
  const { data, error } = await client
    .schema('public')
    .from('movies')
    .select(MOVIE_COLUMNS)
    .order('title', { ascending: true })

  if (error) {
    throw new Error('Nepavyko prisijungti prie duomenų bazės.')
  }

  return (data ?? []).map(normalizeMovie)
}

export async function createMovie(movie, client = requireSupabase()) {
  let data
  let error
  try {
    ;({ data, error } = await client
      .schema('public')
      .from('movies')
      .insert(movie)
      .select(MOVIE_COLUMNS)
      .single())
  } catch (cause) {
    throw new Error(getErrorMessage(cause, 'Filmo pridėti nepavyko. Patikrinkite ryšį ir bandykite dar kartą.'), { cause })
  }

  if (error) {
    throw new Error(
      error.code === '42501'
        ? 'Neturite teisės pridėti filmų. Prisijunkite administratoriaus paskyra.'
        : 'Filmo pridėti nepavyko. Patikrinkite duomenis ir bandykite dar kartą.',
    )
  }

  return normalizeMovie(data)
}

export async function updateMovie(id, movie, client = requireSupabase()) {
  let data
  let error
  try {
    ;({ data, error } = await client
      .schema('public')
      .from('movies')
      .update(movie)
      .eq('id', id)
      .select(MOVIE_COLUMNS)
      .single())
  } catch (cause) {
    throw new Error(getErrorMessage(cause, 'Filmo atnaujinti nepavyko. Patikrinkite ryšį ir bandykite dar kartą.'), { cause })
  }

  if (error) {
    throw new Error(
      error.code === '42501'
        ? 'Neturite teisės redaguoti filmų.'
        : 'Filmo atnaujinti nepavyko. Patikrinkite duomenis ir bandykite dar kartą.',
    )
  }

  return normalizeMovie(data)
}

export async function deleteMovie(id, client = requireSupabase()) {
  let data
  let error
  try {
    ;({ data, error } = await client
      .schema('public')
      .from('movies')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle())
  } catch (cause) {
    throw new Error(getErrorMessage(cause, 'Filmo ištrinti nepavyko. Patikrinkite ryšį ir bandykite dar kartą.'), { cause })
  }

  if (error) {
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
