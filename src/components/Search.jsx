import React, { useState, useContext, useEffect, useRef } from 'react';
import { Context } from '../store/appContext.jsx';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
    const { store } = useContext(Context);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);


    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 1) {
            const filtered = store.searchData.filter(item => 
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSuggestionClick = (item) => {
        setQuery("");
        setSuggestions([]);
        setShowSuggestions(false);
        navigate(`/${item.type}/${item.uid}`);
    };

    return (
        <div ref={searchRef} className="position-relative me-3" style={{minWidth: "200px"}}>
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
                onFocus={() => query.length > 1 && setShowSuggestions(true)}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
                    {suggestions.map((item, index) => (
                        <li 
                            key={`${item.type}-${item.uid}-${index}`}
                            className="list-group-item list-group-item-action"
                            onClick={() => handleSuggestionClick(item)}
                            style={{ cursor: "pointer" }}
                        >
                            {item.name} <small className="text-muted">({item.type})</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};