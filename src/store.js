
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			vehicles: [],
			favorites: [],
			searchData: [] 
		},
		actions: {
			loadInitialData: () => {
				const actions = getActions();
				actions.fetchData("people");
				actions.fetchData("planets");
				actions.fetchData("vehicles");
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
						return { ...item, imageUrl, type: type.slice(0, -1) }; // 'people' -> 'person'
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
			},
			
			addFavorite: (item) => {
				const store = getStore();
				const favorites = store.favorites;
				if (!favorites.some(fav => fav.uid === item.uid && fav.type === item.type)) {
					const newFavorites = [...favorites, item];
					setStore({ ...store, favorites: newFavorites });
				}
			},

			removeFavorite: (itemToRemove) => {
				const store = getStore();
				const newFavorites = store.favorites.filter(item => 
					!(item.uid === itemToRemove.uid && item.type === itemToRemove.type)
				);
				setStore({ ...store, favorites: newFavorites });
			}
		}
	};
};

export default getState;
