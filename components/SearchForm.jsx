import { useState, useEffect } from "react";
import { MovieList2 } from "./MovieList";
import NavigatorFilm from "./Header/Navigator";

export default function SearchFormFilm({ defaultSearchTerm }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Track the current page
    const [hasMore, setHasMore] = useState(true); // Track if there are more movies to load

    const handleSearch = async (newPage = 1) => {
        if (!searchTerm) {
            setError('Введите название фильма для поиска');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&page=${newPage}&apikey=f9787358`);
            const data = await response.json();
            if (data.Response === 'True') {
                if (newPage === 1) {
                    setMovies(data.Search);
                } else {
                    setMovies((prevMovies) => [...prevMovies, ...data.Search]);
                }
                setError('');
                setHasMore(data.Search.length > 0); // Check if there are more movies
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
                setPage(1); // Reset to the first page when the search term changes
                handleSearch(1);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    // Infinite scroll logic
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
            setPage((prevPage) => prevPage + 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore]);

    useEffect(() => {
        if (page > 1) {
            handleSearch(page);
        }
    }, [page]);

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
            <button onClick={() => handleSearch(1)} aria-label="Search button">Найти</button>
        </div>
    );
}