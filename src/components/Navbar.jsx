import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Search } from "./Search";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark mb-3 px-4">
            <Link to="/">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png" 
                    alt="Star Wars Logo"
                    style={{ height: "40px" }}
                />
            </Link>
            <div className="d-flex align-items-center ms-auto">
                <Search /> {/* Componente de búsqueda */}
                <div className="dropdown">
                    <button 
                        className="btn btn-warning dropdown-toggle" 
                        type="button" 
                        id="favoritesDropdown" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                    >
                        Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                        {store.favorites.length > 0 ? (
                            store.favorites.map((fav, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center px-2">
                                    <Link className="dropdown-item" to={`/${fav.type}/${fav.uid}`}>{fav.name}</Link>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => actions.removeFavorite(fav)}>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </li>
                            ))
                        ) : (
                            <li><span className="dropdown-item text-muted">No favorites yet</span></li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
