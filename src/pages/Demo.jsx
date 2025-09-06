// Import necessary components from react-router-dom and other parts of the application.
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.jsx";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-warning">Interacción con el Blog de Star Wars</h2>
      <section className="mb-5">
        <h3>Personajes</h3>
        <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
          {store.characters.map((person) => (
            <div key={person.uid} className="card mx-2" style={{ minWidth: "18rem" }}>
              <img src={person.imageUrl} className="card-img-top" alt={person.name} />
              <div className="card-body">
                <h5 className="card-title">{person.name}</h5>
                <Link to={`/character/${person.uid}`} className="btn btn-outline-primary me-2">Ver detalles</Link>
                <button className="btn btn-outline-warning" onClick={() => actions.addFavorite(person)}>
                  <i className="fa fa-heart" /> Favorito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-5">
        <h3>Planetas</h3>
        <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
          {store.planets.map((planet) => (
            <div key={planet.uid} className="card mx-2" style={{ minWidth: "18rem" }}>
              <img src={planet.imageUrl} className="card-img-top" alt={planet.name} />
              <div className="card-body">
                <h5 className="card-title">{planet.name}</h5>
                <Link to={`/planet/${planet.uid}`} className="btn btn-outline-primary me-2">Ver detalles</Link>
                <button className="btn btn-outline-warning" onClick={() => actions.addFavorite(planet)}>
                  <i className="fa fa-heart" /> Favorito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mb-5">
        <h3>Vehículos</h3>
        <div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
          {store.vehicles.map((vehicle) => (
            <div key={vehicle.uid} className="card mx-2" style={{ minWidth: "18rem" }}>
              <img src={vehicle.imageUrl} className="card-img-top" alt={vehicle.name} />
              <div className="card-body">
                <h5 className="card-title">{vehicle.name}</h5>
                <Link to={`/vehicle/${vehicle.uid}`} className="btn btn-outline-primary me-2">Ver detalles</Link>
                <button className="btn btn-outline-warning" onClick={() => actions.addFavorite(vehicle)}>
                  <i className="fa fa-heart" /> Favorito
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Link to="/">
        <button className="btn btn-secondary">Volver al inicio</button>
      </Link>
    </div>
  );
};
