import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ResponsiveAppBar from "./components/AppBar/AppBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Appointments from "./pages/Appointments";
import Treatments from "./pages/Treatments";
import { useEffect, useState } from "react";
import { Patient } from "./types/patient";
import Profile from "./pages/Profile";

import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import CONFIG from "./config";
import model from "./model/model";

const DUMMY_PATIENT: Patient = {
    id: 0,
    name: "Pedro",
    lastname: "Picapidras",
    email: "dummy@dummy.com",
};

function App() {
    const [patient, setPatient] = useState<Patient>(DUMMY_PATIENT);
    const [patientExists, setPatientExists] = useState(false);

    const links = [{ label: "Book appointment", link: "/booking" }];

    const protectedLinks = [
        { label: "Profile", link: "/profile" },
        { label: "Booked appointments", link: "/appointments" },
        { label: "Treatments", link: "/treatments" },
    ];

    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const tryToGetPatient = async () => {
            const email = user?.email;
            if (email !== undefined) {
                const patientId = await model.getPatientIdGivenEmail(email);
                const accessToken = await getAccessTokenSilently();
                const patient = await model.getPatientProfile(
                    patientId,
                    accessToken
                );
                setPatient(patient);
                setPatientExists(true);
            }
        };

        tryToGetPatient();
    }, [getAccessTokenSilently, isAuthenticated, user?.email, user]);

    return (
        <BrowserRouter>
            <ResponsiveAppBar links={links} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            links={links}
                            protectedLinks={protectedLinks}
                            patientExists={patientExists}
                        />
                    }
                />
                <Route
                    path="/booking"
                    element={<Booking patient={patient} />}
                />
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
    );
}

export default App;
