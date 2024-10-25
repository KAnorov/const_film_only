   const MovieList = ({ movies }) => {
       return (
           <div style={{ marginTop: '20px' }}>
               {movies.map((movie) => (
                   <div key={movie.imdbID} style={{ marginBottom: '20px' }}>
                       <h2>{movie.Title} ({movie.Year})</h2>
                       <img src={movie.Poster} alt={movie.Title} style={{ width: '100px' }} />
                   </div>
               ))}
           </div>
       );
   };

   export default MovieList;