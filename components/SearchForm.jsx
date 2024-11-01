// import { useState } from "react";
// import {MovieList2} from "./MovieList";
// import NavigatorFilm from "./Header/Navigator";


// export default function SearchFormFilm({ defaultSearchTerm }) {
//     const [поисковыйЗапрос, установитьПоисковыйЗапрос] = useState(defaultSearchTerm || '');
//     const [фильмы, установитьФильмы] = useState([]);
//     const [error, setError] = useState('');

//     const handleSearch = async () => {
//         console.debug("Поиск фильма")
//         try {
//             const response = await fetch(`https://www.omdbapi.com/?s=${поисковыйЗапрос}&apikey=f9787358`);
//             const data = await response.json();

//             if (data.Response === 'True') {
//                 установитьФильмы(data.Search);
//                 setError('');
//             } else {
//                 установитьФильмы([]);
//                 setError(data.Error);
//             }
//         } catch (err) {
//             setError('Ошибка при получении данных');
//         }
//     };

//     return (
//         <div className="container">
//             <SearchForm
//                 searchTerm={поисковыйЗапрос}
//                 setSearchTerm={установитьПоисковыйЗапрос}
//                 handleSearch={handleSearch} 
//             />
//             {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
//             <MovieList2 movies={фильмы} />
//         </div>
//     );
// }



// export function SearchForm({ searchTerm, setSearchTerm, handleSearch }) {
//     console.debug("Поиск текста")
//     return <>
//           <div className="search-form">
//           <NavigatorFilm />
//           <div><input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Поиск..."
//             />
//             <button onClick={handleSearch}>Найти</button>
//             </div>
//         </div>
//         </>
// }

SearchFormFilm.js
import { useState, useEffect } from "react";
import { MovieList2 } from "./MovieList";
import NavigatorFilm from "./Header/Navigator";

export default function SearchFormFilm({ defaultSearchTerm }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    // Функция для выполнения поиска
    const handleSearch = async () => {
        if (!searchTerm) {
            setError('Введите название фильма для поиска');
            return;
        }

        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=f9787358`);
            const data = await response.json();
            console.log(data); // Проверяем ответ API для отладки

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
    console.debug("defaultSearchTerm1")
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
            <MovieList2 movies={movies} />
        </div>
    );
}

export function SearchForm({ searchTerm, setSearchTerm, handleSearch }) {
    console.debug("SearchForm")
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
