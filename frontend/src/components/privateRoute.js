import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "axios";

import AreaAdmin from "../pages/areaAdmin/areaAdmin";
import useAuth from "../hooks/useAuth.js";


const PrivateRoute = ({ children }) => {
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	// const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	const checkAuth = async () => {
	// 		try {
	// 			const response = await axios.get("/api/check-auth");
	// 			if (response.status === 200) {
	// 				setIsAuthenticated(true);
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 		setIsLoading(false);
	// 	};
	// 	checkAuth();
	// }, []);

	// if (isLoading) {
	// 	return <div>Loading...</div>;
	// }
	
	// return (
	// 	<Route
	// 		render={(props) =>
	// 			isAuthenticated ? (
	// 				<AreaAdmin {...props} />
	// 			) : (
	// 				<Navigate to={{ pathname: "/login" }} />
	// 			)
	// 		}
	// 	/>
	// );
	const { signed } = useAuth();

	return signed > 0 ? children : <Navigate to="/login"/>

};

export default PrivateRoute;
