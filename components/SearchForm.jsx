const SearchForm = ({ searchTerm, setSearchTerm, handleSearch }) => {
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
};

export default SearchForm;
