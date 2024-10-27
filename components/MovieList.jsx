import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
    return (
        <div className={styles.movieList}>
            {movies.map(movie => (
                <div key={movie.imdbID} className={styles.movieItem}>
                    <img src={movie.Poster} alt={movie.Title} width="150" />
                    <div className={styles.movieTitle}>{movie.Title}</div>
                </div>
            ))}
        </div>
    );
};

export default MovieList;