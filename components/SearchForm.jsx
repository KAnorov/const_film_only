import { useState } from "react";
import MovieList from "./MovieList";


export default function SearchFormFilm() {
    const [поисковыйЗапрос, установитьПоисковыйЗапрос] = useState('');
    const [фильмы, установитьФильмы] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${поисковыйЗапрос}&apikey=f9787358`);
            const data = await response.json();

            if (data.Response === 'True') {
                установитьФильмы(data.Search);
                setError('');
            } else {
                установитьФильмы([]);
                setError(data.Error);
            }
        } catch (err) {
            setError('Ошибка при получении данных');
        }
    };

    return (
        <div className="container">
            <SearchForm
                searchTerm={поисковыйЗапрос}
                setSearchTerm={установитьПоисковыйЗапрос}
                handleSearch={handleSearch} 
            />
            {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
            <MovieList movies={фильмы} />
        </div>
    );
}

export function SearchForm({ searchTerm, setSearchTerm, handleSearch }) {
    return (
        <div className="search-form">
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
