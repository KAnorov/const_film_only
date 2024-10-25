import { useState } from 'react';
import SearchForm from '@/components/SearchForm'; 
import MovieList from '@/components/MovieList';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!searchTerm) return;

        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=f9787358&i`);
            const data = await response.json();
            
            if (data.Response === 'True') {
                setMovies(data.Search);
                setError('');
            } else {
                setMovies([]);
                setError(data.Error);
            }
        } catch (err) {
            setError('Error fetching data');
        }
    };

    return (
        <div className="container">
            <h1>Поиск Фильма</h1>
            <SearchForm 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
            {error && <p style={{ color: 'red' }}>Ошибка: Фильм не найден!</p>}
            <MovieList movies={movies} />
        </div>
    );
}

