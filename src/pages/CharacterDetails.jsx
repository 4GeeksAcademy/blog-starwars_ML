import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CharacterDetails = () => {
    const { theid } = useParams();
    const [details, setDetails] = useState(null);
    const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${theid}.jpg`;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://swapi.tech/api/people/${theid}`);
                if (!response.ok) throw new Error("Could not fetch character details.");
                const data = await response.json();
                setDetails(data.result.properties);
            } catch (error) {
                console.error(error);
            }
        };
        fetchDetails();
    }, [theid]);

    if (!details) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={imageUrl} alt={details.name} className="img-fluid rounded" />
                </div>
                <div className="col-md-6">
                    <h1>{details.name}</h1>
                    <p>
                        A compelling character within the Star Wars saga, {details.name} has a rich history. Born in {details.birth_year}, with {details.hair_color} hair and {details.skin_color} skin, their journey is one to remember.
                    </p>
                </div>
            </div>
            <hr className="my-4" />
            <div className="row text-center text-danger">
                <div className="col"><h5>Name</h5><p>{details.name}</p></div>
                <div className="col"><h5>Birth Year</h5><p>{details.birth_year}</p></div>
                <div className="col"><h5>Gender</h5><p>{details.gender}</p></div>
                <div className="col"><h5>Height</h5><p>{details.height} cm</p></div>
                <div className="col"><h5>Skin Color</h5><p>{details.skin_color}</p></div>
                <div className="col"><h5>Eye Color</h5><p>{details.eye_color}</p></div>
            </div>
        </div>
    );
};