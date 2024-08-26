import React from "react";
import { Route, Routes } from "react-router-dom"
import { Login } from "./pages/Login";
import { Menu } from "./pages/Menu";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="*" element={ <h1>404</h1>} />
        </Routes>
    )
}