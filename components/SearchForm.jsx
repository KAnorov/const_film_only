import { useState, useEffect, useCallback, useMemo, useRef } from 'react';

export default function SearchFormFilm({ defaultSearchTerm }) {
   const [searchTerm, setSearchTerm] = useState('');
   const [movies, setMovies] = useState([]);
   const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
   const pageRef = useRef(1);
   const hasMoreRef = useRef(true);

   const handleSearch = useCallback(async (newPage = 1) => {
       if (!searchTerm) {
           setError('Введите название фильма для поиска');
           return;
       }
       setLoading(true);
       try {
           const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&page=${newPage}&apikey=f9787358`);
           const data = await response.json();
           if (data.Response === 'True') {
               setMovies(prevMovies => newPage === 1 ? data.Search : [...prevMovies, ...data.Search]);
               setError('');
               hasMoreRef.current = data.Search.length > 0; // Check if there are more movies
           } else {
               setMovies([]);
               setError(data.Error || 'Неизвестная ошибка');
           }
       } catch (err) {
           console.error(err);
           setError('Ошибка при получении данных');
       } finally {
          setLoading(false);
       }
   }, [searchTerm]);

   useEffect(() => {
       if (defaultSearchTerm) {
           setSearchTerm(defaultSearchTerm);
           handleSearch();
       }
   }, [defaultSearchTerm, handleSearch]);

   useEffect(() => {
       const handler = setTimeout(() => {
           if (searchTerm) {
               pageRef.current = 1; // Reset to the first page when the search term changes
               handleSearch(1);
           }
       }, 500);

       return () => {
           clearTimeout(handler);
       };
   }, [searchTerm, handleSearch]);

   // Infinite scroll logic
   useEffect(() => {
       const handleScroll = useCallback(() => {
           if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMoreRef.current) return;
           pageRef.current += 1;
           handleSearch(pageRef.current);
       }, [handleSearch]);

       window.addEventListener('scroll', handleScroll);
       return () => {
           window.removeEventListener('scroll', handleScroll);
       };
   }, [handleSearch]);

   const SearchFormMemo = useMemo(() => (
       <SearchForm
           searchTerm={searchTerm}
           setSearchTerm={setSearchTerm}
           handleSearch={handleSearch}
       />
   ), [searchTerm, handleSearch]);

   const MovieList2Memo = useMemo(() => (
       <MovieList2 movies={movies} />
   ), [movies]);

   return (
       <div className="container">
           {SearchFormMemo}
           {loading && <p>Loading...</p>}
           {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
           {MovieList2Memo}
       </div>
   );
}
