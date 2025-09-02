import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const VehicleDetails = () => {
    const { theid } = useParams();
    const [details, setDetails] = useState(null);
    const imageUrl = `https://starwars-visualguide.com/assets/img/vehicles/${theid}.jpg`;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://swapi.tech/api/vehicles/${theid}`);
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
                        This is the {details.name}, a vehicle of class {details.vehicle_class}. Manufactured by {details.manufacturer}, it has a crew capacity of {details.crew} and can carry {details.passengers} passengers. Its cost in credits is {details.cost_in_credits}.
                    </p>
                </div>
            </div>
            <hr className="my-4" />
            <div className="row text-center text-danger">
                <div className="col"><h5>Name</h5><p>{details.name}</p></div>
                <div className="col"><h5>Model</h5><p>{details.model}</p></div>
                <div className="col"><h5>Manufacturer</h5><p>{details.manufacturer}</p></div>
                <div className="col"><h5>Cost</h5><p>{details.cost_in_credits} credits</p></div>
                <div className="col"><h5>Crew</h5><p>{details.crew}</p></div>
                <div className="col"><h5>Passengers</h5><p>{details.passengers}</p></div>
            </div>
        </div>
    );
};
