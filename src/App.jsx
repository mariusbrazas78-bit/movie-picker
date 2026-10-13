import { useState } from 'react'
import MovieCard from './components/MovieCard.jsx'
import { DEMO_GENRES, DEMO_MOODS, DEMO_MOVIES } from './data/demoMovies.js'
import './App.css'

const recommendedMovie = DEMO_MOVIES[1]
const favoritePreview = DEMO_MOVIES[0]

function App() {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedMood, setSelectedMood] = useState('')

  const filteredMovies = DEMO_MOVIES.filter((movie) => {
    const matchesGenre = !selectedGenre || movie.genre === selectedGenre
    const matchesMood = !selectedMood || movie.mood === selectedMood

    return matchesGenre && matchesMood
  })

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
              Pasirinkite žanrą ir nuotaiką, kad rastumėte filmą vakarui.
            </p>
          </div>

          <form className="filters" onSubmit={(event) => event.preventDefault()}>
            <label className="field">
              <span>Žanras</span>
              <select
                name="genre"
                value={selectedGenre}
                onChange={(event) => setSelectedGenre(event.target.value)}
              >
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
              <select
                name="mood"
                value={selectedMood}
                onChange={(event) => setSelectedMood(event.target.value)}
              >
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
              Žemiau – keli aiškiai pažymėti demonstraciniai filmai. Tikras
              katalogas vėliau bus kraunamas iš duomenų bazės.
            </p>
          </div>

          <p className="demo-note">Demonstraciniai duomenys</p>

          <div className="movie-grid">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            ) : (
              <p>Pagal pasirinktus filtrus filmų nerasta.</p>
            )}
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
