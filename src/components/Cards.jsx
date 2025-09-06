import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";

export const Card = ({ item }) => {
    const { actions, store } = useContext(Context);
    const isFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type);
    const handleImageError = (e) => {
        e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    };

    return (
        <div className="card mx-2" style={{ minWidth: "18rem" }}>
            <img 
                src={item.imageUrl} 
                className="card-img-top" 
                alt={item.name}
                onError={handleImageError}
            />
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <div className="d-flex justify-content-between">
                    <Link to={`/${item.type}/${item.uid}`} className="btn btn-outline-primary">
                        Learn More!
                    </Link>
                    <button 
                        className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={() => actions.addFavorite(item)}
                    >
                        <i className="fa fa-heart" />
                    </button>
                </div>
            </div>
        </div>
    );
};