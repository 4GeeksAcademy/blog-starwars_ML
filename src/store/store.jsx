// Estado global y acciones para Star Wars Blog
// Este archivo fusiona la lógica de ambos store.js y usa JSX para compatibilidad con React
import React from "react";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            favorites: [],
            characters: [],
            people: [],
            planets: [],
            vehicles: [],
            searchData: [
                { uid: "1", name: "Luke Skywalker", type: "character" },
                { uid: "2", name: "Darth Vader", type: "character" },
                { uid: "1", name: "Tatooine", type: "planet" },
                { uid: "2", name: "Alderaan", type: "planet" },
                { uid: "1", name: "X-wing", type: "vehicle" },
                { uid: "2", name: "TIE Fighter", type: "vehicle" }
            ]
        },
        actions: {
            addFavorite: item => {
                const store = getStore();
                if (!store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type)) {
                    setStore({ favorites: [...store.favorites, item] });
                }
            },
            removeFavorite: item => {
                const store = getStore();
                setStore({ favorites: store.favorites.filter(fav => fav.uid !== item.uid || fav.type !== item.type) });
            },
            setCharacters: characters => {
                setStore({ characters });
            },
            setPlanets: planets => {
                setStore({ planets });
            },
            setVehicles: vehicles => {
                setStore({ vehicles });
            },
            loadInitialData: () => {
                setStore({
                    characters: [
                        { uid: "1", name: "Luke Skywalker", type: "character", imageUrl: "https://starwars-visualguide.com/assets/img/characters/1.jpg" },
                        { uid: "2", name: "Darth Vader", type: "character", imageUrl: "https://starwars-visualguide.com/assets/img/characters/4.jpg" }
                    ],
                    people: [
                        { uid: "1", name: "Luke Skywalker", type: "character", imageUrl: "https://starwars-visualguide.com/assets/img/characters/1.jpg" },
                        { uid: "2", name: "Darth Vader", type: "character", imageUrl: "https://starwars-visualguide.com/assets/img/characters/4.jpg" }
                    ],
                    planets: [
                        { uid: "1", name: "Tatooine", type: "planet", imageUrl: "https://starwars-visualguide.com/assets/img/planets/1.jpg" },
                        { uid: "2", name: "Alderaan", type: "planet", imageUrl: "https://starwars-visualguide.com/assets/img/planets/2.jpg" }
                    ],
                    vehicles: [
                        { uid: "1", name: "X-wing", type: "vehicle", imageUrl: "https://starwars-visualguide.com/assets/img/vehicles/12.jpg" },
                        { uid: "2", name: "TIE Fighter", type: "vehicle", imageUrl: "https://starwars-visualguide.com/assets/img/vehicles/13.jpg" }
                    ]
                });
            },
            fetchData: async (type) => {
                try {
                    const response = await fetch(`https://swapi.tech/api/${type}/`);
                    if (!response.ok) throw new Error("Network response was not ok.");
                    const data = await response.json();
                    const store = getStore();
                    const itemsWithDetails = data.results.map(item => {
                        const id = item.uid;
                        const imageType = type === 'people' ? 'characters' : type;
                        const imageUrl = `https://starwars-visualguide.com/assets/img/${imageType}/${id}.jpg`;
                        return { ...item, imageUrl, type: type.slice(0, -1) };
                    });
                    setStore({ ...store, [type]: itemsWithDetails });
                    getActions().updateSearchData();
                } catch (error) {
                    console.error(`Error fetching ${type}:`, error);
                }
            },
            updateSearchData: () => {
                const store = getStore();
                const combinedData = [...store.people, ...store.planets, ...store.vehicles];
                setStore({ ...store, searchData: combinedData });
            }
        }
    };
};

export default getState;
