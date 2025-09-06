import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.jsx";
import { Outlet } from "react-router-dom";
import { Home } from "./Home";
import { CharacterDetails } from "./CharacterDetails";
import { PlanetDetails } from "./PlanetDetails";
import { VehicleDetails } from "./VehicleDetails";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const { actions } = useContext(Context);
    useEffect(() => {
        actions.loadInitialData();
    }, []);

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;