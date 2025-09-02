import React, { useContext } from "react";
import { Card } from "//components/Card";
import "//styles/home.css";

export const Home = () => {
	const { store } = useContext(Context);

	return (
		<div className="container mt-5">
			<h1 className="text-warning mb-4">Characters</h1>
			<div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
				{store.people.map((person) => (
					<Card key={person.uid} item={person} />
				))}
			</div>

			<h1 className="text-warning mt-5 mb-4">Planets</h1>
			<div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
				{store.planets.map((planet) => (
					<Card key={planet.uid} item={planet} />
				))}
			</div>

			<h1 className="text-warning mt-5 mb-4">Vehicles</h1>
			<div className="d-flex flex-row flex-nowrap overflow-auto pb-3">
				{store.vehicles.map((vehicle) => (
					<Card key={vehicle.uid} item={vehicle} />
				))}
			</div>
		</div>
	);
};
