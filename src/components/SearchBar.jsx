function SearchBar({ searchText, setSearchText }) {
  return (
    <div className="search-wrapper">
      {/* search-inner positions the icon INSIDE the input */}
      <div className="search-inner">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by role (e.g. Frontend, DevOps...)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;