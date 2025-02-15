import { useState, useEffect } from "react";
import { MovieList2 } from "./MovieList";
import NavigatorFilm from "./Header/Navigator";

export default function SearchFormFilm({ defaultSearchTerm }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm) {
            setError('Введите название фильма для поиска');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=f9787358`);
            const data = await response.json();
            console.log(data);
            if (data.Response === 'True') {
                setMovies(data.Search);
                setError('');
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
    };

    useEffect(() => {
        if (defaultSearchTerm) {
            setSearchTerm(defaultSearchTerm);
            handleSearch();
        }
    }, [defaultSearchTerm]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                handleSearch();
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    return (
        <div className="container">
            <SearchForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
            <MovieList2 movies={movies} />
        </div>
    );
}

export function SearchForm({ searchTerm, setSearchTerm, handleSearch }) {
    return (
        <div className="search-form">
            <NavigatorFilm />
            <label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Поиск..."
                    aria-label="Search for a movie"
                />
            </label>
            <button onClick={handleSearch} aria-label="Search button">Найти</button>
        </div>
    );
}