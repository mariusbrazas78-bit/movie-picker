import { useEffect, useState } from 'react'
import MovieCard from './components/MovieCard.jsx'
import { DEMO_GENRES, DEMO_MOODS, DEMO_MOVIES } from './data/demoMovies.js'
import { fetchMovies } from './lib/movies.js'
import './App.css'

const recommendedMovie = DEMO_MOVIES[1]
const favoritePreview = DEMO_MOVIES[0]

function App() {
  const [remoteMovies, setRemoteMovies] = useState([])
  const [loadState, setLoadState] = useState('loading')
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadMovies() {
      try {
        const movies = await fetchMovies()
        if (cancelled) {
          return
        }

        setRemoteMovies(movies)
        setLoadState(movies.length === 0 ? 'empty' : 'ready')
      } catch (error) {
        if (cancelled) {
          return
        }

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
        <section className="panel" aria-labelledby="filters-heading">
          <div className="panel__intro">
            <h2 id="filters-heading">Filtravimas</h2>
            <p>
              Pasirinkite žanrą ir nuotaiką. Filtravimo logika bus pridėta
              vėliau.
            </p>
          </div>

          <form className="filters" onSubmit={(event) => event.preventDefault()}>
            <label className="field">
              <span>Žanras</span>
              <select name="genre" defaultValue="">
                <option value="">Visi žanrai</option>
                {DEMO_GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Nuotaika</span>
              <select name="mood" defaultValue="">
                <option value="">Visos nuotaikos</option>
                {DEMO_MOODS.map((mood) => (
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
              Demonstracinis pasiūlymas dizainui. Atsitiktinis parinkimas bus
              įgyvendintas kitame etape.
            </p>
          </div>
          <MovieCard movie={recommendedMovie} featured />
        </section>

        <section className="panel" aria-labelledby="catalog-heading">
          <div className="panel__intro">
            <h2 id="catalog-heading">Filmų sąrašas</h2>
            <p>
              Žemiau rodomi filmai iš duomenų bazės. Demonstraciniai filmai
              palikti dizainui patikrinti.
            </p>
          </div>

          {loadState === 'loading' ? (
            <p className="status" role="status">
              Kraunami filmai...
            </p>
          ) : null}

          {loadState === 'error' ? (
            <p className="status status--error" role="alert">
              {loadError}
            </p>
          ) : null}

          {loadState === 'empty' ? (
            <p className="status" role="status">
              Filmų sąrašas tuščias
            </p>
          ) : null}

          {loadState === 'ready' ? (
            <div className="movie-grid">
              {remoteMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : null}

          <p className="demo-note">Demonstraciniai duomenys</p>

          <div className="movie-grid">
            {DEMO_MOVIES.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        <section className="panel" aria-labelledby="favorites-heading">
          <div className="panel__intro">
            <h2 id="favorites-heading">Mėgstamiausi filmai</h2>
            <p>
              Čia vėliau atsiras jūsų išsaugoti filmai. Dabar rodomas tik
              dizaino pavyzdys.
            </p>
          </div>

          <div className="movie-grid movie-grid--favorites">
            <MovieCard movie={favoritePreview} variant="favorite" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Movie Picker · mokomasis projektas</p>
      </footer>
    </div>
  )
}

export default App
