import '../css/components/SearchBar.css'

export function SearchBar() {

    return (
        <div className='searchBar-container'>
            <svg
                className='searchBar-icon'
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
                className='searchBar-input'
                type="search"
                placeholder="Search movie, cinema, genre..."
            />
        </div>
    );
}