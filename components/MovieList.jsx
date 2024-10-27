const MovieList = ({ movies }) => {
       return (
        <fieldset>
           <ul>
               {movies.map((movie) => (
                   <li key={movie.imdbID}>
                       <h2>{movie.Title} ({movie.Year})</h2>
                       <img src={movie.Poster} alt={movie.Title} />
                   </li>
               ))}
           </ul>
           </fieldset>
       )
   }

   export default MovieList;