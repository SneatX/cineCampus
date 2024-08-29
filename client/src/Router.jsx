import React from "react";
import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login";
import { Index } from "./pages/Index";
import { MovieDescription } from "./pages/MovieDescription";
import { ChooseSeat } from "./pages/ChooseSeat";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/menu" element={<Index />} />
            <Route path="/movieDescription/:idPeli" element={<MovieDescription />} />
            <Route path="/chooseSeat/:idPeli" element={<ChooseSeat />} />
            <Route path="*" element={ <h1>404</h1>} />
        </Routes>
    )
}