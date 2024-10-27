import { useState, useEffect } from "react";
import MovieList from "./MovieList";
import NavigatorFilm from "./Header/Navigator";

export default function SearchFormFilm({ defaultSearchTerm }) {
    const
        [searchTerm, setSearchTerm] = useState(''),
        [movies, setMovies] = useState([]),
        [error, setError] = useState('');


    const handleSearch = async () => {
        if (!searchTerm) {
            setError('Введите название фильма для поиска');
            return;
        }

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
        }
    };

    // useEffect для выполнения дефолтного поиска при первом рендере
    useEffect(() => {
        if (defaultSearchTerm) {
            setSearchTerm(defaultSearchTerm); // Установка дефолтного поискового запроса
        }
    }, [defaultSearchTerm]); // Зависимость от defaultSearchTerm

    // Выполнение поиска при изменении searchTerm
    useEffect(() => {
        if (searchTerm) {
            handleSearch(); // Выполнение поиска только если есть searchTerm
        }
    }, [searchTerm]);

    return (
        <div className="container">
            <SearchForm
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
            />
            {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
            <MovieList movies={movies} />
        </div>
    );
}

export function SearchForm({ searchTerm, setSearchTerm, handleSearch }) {
    return (
        <div className="search-form">
            <NavigatorFilm />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск..."
            />
            <button onClick={handleSearch}>Найти</button>
            
        </div>
    );
}
