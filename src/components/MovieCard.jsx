function MovieCard({
  movie,
  variant = 'catalog',
  featured = false,
  isFavorite = variant === 'favorite',
  onToggleFavorite,
}) {

  return (
    <article className={`movie-card${featured ? ' movie-card--featured' : ''}`}>
      <header className="movie-card__header">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__rating" aria-label={`Įvertinimas ${movie.rating} iš 10`}>
          <span className="movie-card__rating-value">{Number(movie.rating).toFixed(1)}</span>
          <span className="movie-card__rating-scale"> / 10</span>
        </p>
      </header>

      <ul className="movie-card__meta">
        <li>
          <span className="movie-card__label">Žanras</span>
          <span>{movie.genre}</span>
        </li>
        <li>
          <span className="movie-card__label">Nuotaika</span>
          <span>{movie.mood}</span>
        </li>
        <li>
          <span className="movie-card__label">Metai</span>
          <span>{movie.release_year}</span>
        </li>
      </ul>

      <p className="movie-card__description">{movie.description}</p>

      <button
        type="button"
        className="movie-card__action"
        onClick={() => onToggleFavorite?.(movie)}
        aria-pressed={isFavorite}
      >
        {isFavorite ? 'Pašalinti iš mėgstamiausių' : 'Pridėti prie mėgstamiausių'}
      </button>
    </article>
  )
}

export default MovieCard
