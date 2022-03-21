import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import {useUserMetadata} from "../hooks";
const HomeRoute: React.FC<Record<string, never>> = () => {
    const {role}= useUserMetadata();
    return <>
    {
        role === "STUDENT"? <Navigate to="/app/student" replace /> : role === "TEACHER"? <Navigate to="/app/teach" replace/> : <Outlet />
        
    }
    </>
}
export default HomeRoute;