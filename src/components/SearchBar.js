
import React from 'react';

const SearchBar = ({ onInputSubmit, onInputChange }) => {

    return (
        <div className="search">
            <input type="text" placeholder="Search.." name="search" onChange={onInputChange} />
            <button type="submit" onClick={onInputSubmit}><i className="fa fa-search"></i></button>
        </div>
    );
}

export default SearchBar;