import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ResponsiveAppBar from "./components/AppBar/AppBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

function App() {
    return (
        <>
            <ResponsiveAppBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book" element={<Booking />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
