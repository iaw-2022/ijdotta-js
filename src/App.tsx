import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ResponsiveAppBar from "./components/AppBar/AppBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Appointments from './pages/Appointments'
import Treatments from "./pages/Treatments";
import { useState } from "react";
import { Patient } from "./types/patient";
import Profile from "./pages/Profile";

const DUMMY_PATIENT: Patient = {
    id: 12345,
    name: "Pedro",
    lastname: "Picapidras",
    email: "dummy@dummy.com",
}

function App() {

    const [patient, setPatient] = useState<Patient>(DUMMY_PATIENT);

    return (
        <>
            <ResponsiveAppBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/appointments" element={<Appointments patient={patient}/>} />
                    <Route path="/treatments" element={<Treatments patient={patient}/>} />
                    <Route path="/profile" element={<Profile patient={patient}/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
