import { useEffect, useState } from 'react'
import MovieCard from './components/MovieCard.jsx'
import { fetchMovies } from './lib/movies.js'
import { supabase } from './lib/supabase.js'
import './App.css'

const FAVORITES_STORAGE_KEY = 'movie-picker-favorites'

function readStoredFavorites() {
  try {
    const storedFavorites = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!storedFavorites) return []

    const parsedFavorites = JSON.parse(storedFavorites)
    if (!Array.isArray(parsedFavorites)) return []

    return parsedFavorites.filter(
      (movie) => movie && typeof movie === 'object' && movie.id != null,
    )
  } catch (error) {
    console.error('Nepavyko nuskaityti mėgstamiausių filmų:', error)
    return []
  }
}

function App() {
  const [remoteMovies, setRemoteMovies] = useState([])
  const [loadState, setLoadState] = useState('loading')
  const [loadError, setLoadError] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedMood, setSelectedMood] = useState('')
  const [recommendedMovie, setRecommendedMovie] = useState(null)
  const [recommendationMessage, setRecommendationMessage] = useState('')
  const [favoriteMovies, setFavoriteMovies] = useState(readStoredFavorites)
  const [authSession, setAuthSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(Boolean(supabase))
  const [authError, setAuthError] = useState('')
  const [authMessage, setAuthMessage] = useState('')

  useEffect(() => {
    if (!supabase) return undefined

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session)
      setAuthError('')
      setAuthMessage('')
      setAuthLoading(false)
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favoriteMovies),
      )
    } catch (error) {
      console.error('Nepavyko išsaugoti mėgstamiausių filmų:', error)
    }
  }, [favoriteMovies])

  function handleToggleFavorite(movie) {
    setFavoriteMovies((currentFavorites) => {
      const isFavorite = currentFavorites.some(
        (favorite) => favorite.id === movie.id,
      )

      return isFavorite
        ? currentFavorites.filter((favorite) => favorite.id !== movie.id)
        : [...currentFavorites, movie]
    })
  }

  async function handleSignIn(event) {
    event.preventDefault()
    const form = event.currentTarget
    setAuthError('')
    setAuthMessage('')

    if (!supabase) {
      setAuthError('Prisijungimas nepasiekiamas: trūksta Supabase konfigūracijos.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setAuthError('Prisijungti nepavyko. Patikrinkite el. paštą ir slaptažodį.')
      return
    }

    setAuthSession(data.session)
    setAuthMessage('Sėkmingai prisijungėte.')
    form.reset()
  }

  async function handleSignOut() {
    setAuthError('')
    setAuthMessage('')

    if (!supabase) return

    const { error } = await supabase.auth.signOut()
    if (error) {
      setAuthError('Atsijungti nepavyko. Bandykite dar kartą.')
      return
    }

    setAuthSession(null)
    setAuthMessage('Atsijungėte.')
  }

  const isAdmin = authSession?.user?.app_metadata?.role === 'admin'

  useEffect(() => {
    let cancelled = false

    async function loadMovies() {
      try {
        const movies = await fetchMovies()
        if (cancelled) return

        setRemoteMovies(movies)
        setLoadState(movies.length === 0 ? 'empty' : 'ready')
      } catch (error) {
        if (cancelled) return

        setRemoteMovies([])
        setLoadError(
          error instanceof Error
            ? error.message
            : 'Nepavyko prisijungti prie duomenų bazės.',
        )
        setLoadState('error')
      }
    }

    loadMovies()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredMovies = remoteMovies.filter((movie) => {
    const matchesGenre = !selectedGenre || movie.genre === selectedGenre
    const matchesMood = !selectedMood || movie.mood === selectedMood

    return matchesGenre && matchesMood
  })

  function handlePickMovie() {
    if (loadState !== 'ready') {
      setRecommendedMovie(null)
      setRecommendationMessage(
        loadState === 'loading'
          ? 'Kraunami filmai...'
          : loadState === 'error'
            ? loadError
            : 'Filmų sąrašas tuščias.',
      )
      return
    }

    if (filteredMovies.length === 0) {
      setRecommendedMovie(null)
      setRecommendationMessage('Pagal pasirinktus filtrus filmų nerasta.')
      return
    }

    const candidates = filteredMovies.filter(
      (movie) => movie.id !== recommendedMovie?.id,
    )
    const availableMovies = candidates.length > 0 ? candidates : filteredMovies
    const randomIndex = Math.floor(Math.random() * availableMovies.length)

    setRecommendedMovie(availableMovies[randomIndex])
    setRecommendationMessage('')
  }

  const genres = [...new Set(remoteMovies.map((movie) => movie.genre).filter(Boolean))]
  const moods = [...new Set(remoteMovies.map((movie) => movie.mood).filter(Boolean))]

  return (
    <div className="app">
      <header className="hero">
        <p className="hero__eyebrow">Filmų vakarui</p>
        <h1>Movie Picker</h1>
        <p className="hero__subtitle">
          Nežinai, ką žiūrėti? Padėsime išsirinkti filmą!
        </p>
      </header>

      <main>
        <section className="panel" aria-labelledby="admin-login-heading">
          <div className="panel__intro">
            <h2 id="admin-login-heading">Administratoriaus prisijungimas</h2>
            <p>Prisijungti gali tik Supabase Auth paskyra, kuriai suteiktas administratoriaus vaidmuo.</p>
          </div>

          {authLoading ? (
            <p className="status" role="status">Tikrinama prisijungimo būsena...</p>
          ) : null}

          {!authLoading && !authSession ? (
            <form className="admin-login" onSubmit={handleSignIn}>
              <label className="field">
                <span>El. paštas</span>
                <input name="email" type="email" autoComplete="username" required />
              </label>
              <label className="field">
                <span>Slaptažodis</span>
                <input name="password" type="password" autoComplete="current-password" required />
              </label>
              <button type="submit" className="pick-button">Prisijungti</button>
            </form>
          ) : null}

          {!authLoading && authSession && !isAdmin ? (
            <div className="admin-auth-status">
              <p className="status">Esate prisijungę, tačiau ši paskyra neturi administratoriaus teisių.</p>
              <button type="button" className="admin-button" onClick={handleSignOut}>Atsijungti</button>
            </div>
          ) : null}

          {!authLoading && isAdmin ? (
            <div className="admin-auth-status">
              <p className="status">Prisijungė administratorius: {authSession.user.email}</p>
              <button type="button" className="admin-button" onClick={handleSignOut}>Atsijungti</button>
            </div>
          ) : null}

          {authError ? <p className="status status--error" role="alert">{authError}</p> : null}
          {authMessage ? <p className="status" role="status">{authMessage}</p> : null}
        </section>

        {isAdmin ? (
          <section className="panel" aria-labelledby="admin-tools-heading">
            <div className="panel__intro">
              <h2 id="admin-tools-heading">Filmų administravimas</h2>
              <p>Administratoriaus įrankiai bus pateikti čia.</p>
            </div>
            <p className="status">Filmų kūrimo, redagavimo ir trynimo funkcijos bus pridėtos kitame etape.</p>
          </section>
        ) : null}

        <section className="panel" aria-labelledby="filters-heading">
          <div className="panel__intro">
            <h2 id="filters-heading">Filtravimas</h2>
            <p>
              Pasirinkite žanrą ir nuotaiką, kad rastumėte filmą vakarui.
            </p>
          </div>

          <form
            className="filters"
            onSubmit={(event) => {
              event.preventDefault()
              handlePickMovie()
            }}
          >
            <label className="field">
              <span>Žanras</span>
              <select
                name="genre"
                value={selectedGenre}
                onChange={(event) => setSelectedGenre(event.target.value)}
              >
                <option value="">Visi žanrai</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Nuotaika</span>
              <select
                name="mood"
                value={selectedMood}
                onChange={(event) => setSelectedMood(event.target.value)}
              >
                <option value="">Visos nuotaikos</option>
                {moods.map((mood) => (
                  <option key={mood} value={mood}>
                    {mood}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" className="pick-button">
              Parinkti filmą
            </button>
          </form>
        </section>

        <section className="panel" aria-labelledby="recommended-heading">
          <div className="panel__intro">
            <h2 id="recommended-heading">Rekomenduojamas filmas</h2>
            <p>
              Atsitiktinai parinktas filmas pagal jūsų pasirinktus filtrus.
            </p>
          </div>
          {recommendedMovie ? (
            <MovieCard
              movie={recommendedMovie}
              featured
              isFavorite={favoriteMovies.some(
                (movie) => movie.id === recommendedMovie.id,
              )}
              onToggleFavorite={handleToggleFavorite}
            />
          ) : (
            <p role="status">
              {recommendationMessage || 'Paspauskite „Parinkti filmą“, kad gautumėte rekomendaciją.'}
            </p>
          )}
        </section>

        <section className="panel" aria-labelledby="catalog-heading">
          <div className="panel__intro">
            <h2 id="catalog-heading">Filmų sąrašas</h2>
            <p>Žemiau rodomi filmai iš duomenų bazės.</p>
          </div>

          {loadState === 'loading' ? (
            <p className="status" role="status">Kraunami filmai...</p>
          ) : null}

          {loadState === 'error' ? (
            <p className="status status--error" role="alert">{loadError}</p>
          ) : null}

          {loadState === 'empty' ? (
            <p className="status" role="status">Filmų sąrašas tuščias</p>
          ) : null}

          {loadState === 'ready' ? (
            filteredMovies.length > 0 ? (
              <div className="movie-grid">
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isFavorite={favoriteMovies.some(
                      (favorite) => favorite.id === movie.id,
                    )}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <p className="status" role="status">
                Pagal pasirinktus filtrus filmų nerasta.
              </p>
            )
          ) : null}
        </section>

        <section className="panel" aria-labelledby="favorites-heading">
          <div className="panel__intro">
            <h2 id="favorites-heading">Mėgstamiausi filmai</h2>
            <p>Čia rodomi jūsų išsaugoti filmai.</p>
          </div>

          {favoriteMovies.length > 0 ? (
            <div className="movie-grid movie-grid--favorites">
              {favoriteMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  variant="favorite"
                  isFavorite
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <p className="status" role="status">
              Mėgstamiausių filmų dar nėra.
            </p>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Movie Picker · mokomasis projektas</p>
      </footer>
    </div>
  )
}

export default App
