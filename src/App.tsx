import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ResponsiveAppBar from "./components/AppBar/AppBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Appointments from "./pages/Appointments";
import Treatments from "./pages/Treatments";
import { useState } from "react";
import { Patient } from "./types/patient";
import Profile from "./pages/Profile";

import { Auth0Provider } from "@auth0/auth0-react";
import CONFIG from "./config";

const DUMMY_PATIENT: Patient = {
    id: 42631354,
    name: "Pedro",
    lastname: "Picapidras",
    email: "dummy@dummy.com",
};

function App() {
    const [patient, setPatient] = useState<Patient>(DUMMY_PATIENT);

    const links = [
        { label: "Book appointment", link: "/booking" },
    ];
    
    const protectedLinks = [
        { label: "Profile", link: "/profile" },
        { label: "Booked appointments", link: "/appointments" },
        { label: "Treatments", link: "/treatments" },
    ]

    return (
        <Auth0Provider
            domain={CONFIG.AUTH0.DOMAIN}
            clientId={CONFIG.AUTH0.CLIENT_ID}
            redirectUri={window.location.origin}
            audience={CONFIG.AUTH0.AUDIENCE}
            scope={""}
        >
            <BrowserRouter>
                <ResponsiveAppBar links={links} />
                <Routes>
                    <Route path="/" element={<Home links={links} protectedLinks={protectedLinks} />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route
                        path="/appointments"
                        element={<Appointments patient={patient} />}
                    />
                    <Route
                        path="/treatments"
                        element={<Treatments patient={patient} />}
                    />
                    <Route
                        path="/profile"
                        element={<Profile patient={patient} />}
                    />
                </Routes>
            </BrowserRouter>
        </Auth0Provider>
    );
}

export default App;
