import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { createMovie, deleteMovie, fetchMovies, updateMovie } from './movies.js'

function movie(overrides = {}) {
  return {
    id: 'movie-1',
    title: 'Žalioji žvaigždė',
    genre: 'Mokslinė fantastika',
    mood: 'Įtempta',
    description: 'Lietuviškos raidės: ąčęėįšųūž; simboliai: !?&.',
    release_year: '2024',
    rating: '8.5',
    ...overrides,
  }
}

function createClient(responseOrError) {
  let query = { data: null, error: null }
  const builder = {
    select: () => builder,
    order: () => Promise.resolve(query),
    insert: () => builder,
    update: () => builder,
    delete: () => builder,
    eq: () => builder,
    single: () => Promise.resolve(query),
    maybeSingle: () => Promise.resolve(query),
  }
  return {
    schema: () => ({
      from: () => {
        query = responseOrError instanceof Error
          ? Promise.reject(responseOrError)
          : responseOrError
        return builder
      },
    }),
  }
}

describe('movies API', () => {
  it('handles an empty catalog returned by a mocked Supabase client', async () => {
    const movies = await fetchMovies(createClient({ data: [], error: null }))

    assert.deepEqual(movies, [])
    assert.equal(movies.length, 0)
  })

  it('normalizes catalog numbers and preserves Lithuanian text', async () => {
    const [result] = await fetchMovies(createClient({ data: [movie()], error: null }))
    assert.equal(result.release_year, 2024)
    assert.equal(result.rating, 8.5)
    assert.equal(result.title, 'Žalioji žvaigždė')
    assert.match(result.description, /ąčęėįšųūž/)
  })

  it('returns an empty catalog for a null response', async () => {
    assert.deepEqual(await fetchMovies(createClient({ data: null, error: null })), [])
  })

  it('converts a mocked Supabase query error into a database connection error', async () => {
    const client = createClient({
      data: null,
      error: { code: '08006', message: 'mocked connection failure' },
    })

    await assert.rejects(
      fetchMovies(client),
      /Nepavyko prisijungti prie duomenų bazės\./,
    )
  })

  it('maps permission failures to a safe, useful message', async () => {
    const client = createClient({ data: null, error: { code: '42501', message: 'internal policy detail' } })
    await assert.rejects(createMovie(movie(), client), /Neturite teisės pridėti filmų/)
  })

  it('surfaces network rejection for create and update operations', async () => {
    const client = createClient(new TypeError('Failed to fetch'))
    await assert.rejects(createMovie(movie(), client), /Failed to fetch/)
    await assert.rejects(updateMovie('movie-1', movie(), client), /Failed to fetch/)
  })

  it('normalizes created and updated records', async () => {
    const client = createClient({ data: movie(), error: null })
    assert.equal((await createMovie(movie(), client)).rating, 8.5)
    assert.equal((await updateMovie('movie-1', movie(), client)).release_year, 2024)
  })

  it('reports delete permission failures, network errors, and missing records', async () => {
    await assert.rejects(
      deleteMovie('movie-1', createClient({ data: null, error: { code: '42501' } })),
      /Neturite teisės ištrinti filmų/,
    )
    await assert.rejects(
      deleteMovie('movie-1', createClient(new TypeError('offline'))),
      /offline/,
    )
    await assert.rejects(
      deleteMovie('missing', createClient({ data: null, error: null })),
      /Filmas nerastas/,
    )
  })
})
