import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
	return (
		<div className="container text-center mt-5">
			<h1 className="display-3 mb-4 text-warning">Bienvenido al Blog de Star Wars</h1>
			<p className="lead mb-5">Explora personajes, planetas y vehículos del universo Star Wars. Haz clic abajo para comenzar la aventura.</p>
			<Link to="/demo">
				<button className="btn btn-lg btn-primary">Ir al Blog Interactivo</button>
			</Link>
			<div className="mt-5">
				<img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" alt="Star Wars Logo" style={{maxWidth: '300px'}} />
			</div>
		</div>
	);
};
