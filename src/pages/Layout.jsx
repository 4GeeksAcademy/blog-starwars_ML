import React, { useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "//home";
import { CharacterDetails } from "//CharacterDetails";
import { PlanetDetails } from "//PlanetDetails";
import { VehicleDetails } from "//VehicleDetails";
import { Navbar } from "//components/Navbar";
import { Footer } from "//components/Footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const { actions } = useContext(Context);
    useEffect(() => {
        actions.loadInitialData();
    }, []);

    return (
        <div>
            <BrowserRouter basename={basename}>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/character/:theid" element={<CharacterDetails />} />
                    <Route path="/planet/:theid" element={<PlanetDetails />} />
                    <Route path="/vehicle/:theid" element={<VehicleDetails />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Layout;