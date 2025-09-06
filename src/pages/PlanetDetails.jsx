import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const PlanetDetails = () => {
    const { theid } = useParams();
    const [details, setDetails] = useState(null);
    const imageUrl = `https://starwars-visualguide.com/assets/img/planets/${theid}.jpg`;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://swapi.tech/api/planets/${theid}`);
                const data = await response.json();
                setDetails(data.result.properties);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDetails();
    }, [theid]);

    if (!details) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={imageUrl} onError={(e) => e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'} alt={details.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h1>{details.name}</h1>
                    <p>
                        The planet {details.name} is a world with a climate classified as {details.climate}. It has a terrain primarily composed of {details.terrain} and a diameter of {details.diameter} kilometers. Its population is recorded to be {details.population}.
                    </p>
                </div>
            </div>
            <hr className="my-4" />
            <div className="row text-center text-danger">
                <div className="col"><h5>Name</h5><p>{details.name}</p></div>
                <div className="col"><h5>Climate</h5><p>{details.climate}</p></div>
                <div className="col"><h5>Population</h5><p>{details.population}</p></div>
                <div className="col"><h5>Orbital Period</h5><p>{details.orbital_period} days</p></div>
                <div className="col"><h5>Rotation Period</h5><p>{details.rotation_period} hours</p></div>
                <div className="col"><h5>Diameter</h5><p>{details.diameter} km</p></div>
            </div>
        </div>
    );
};
