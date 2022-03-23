import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
const HomeRoute: React.FC<Record<string, never>> = () => {
    return <>
        <Outlet />
        <Footer/>
    </>
}
export default HomeRoute;