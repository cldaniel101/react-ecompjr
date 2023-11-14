import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "axios";

import AreaAdmin from "../pages/areaAdmin/areaAdmin";

const PrivateRoute = ({ component: AreaAdmin, ...rest }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await axios.get("/api/check-auth");
				if (response.status === 200) {
					setIsAuthenticated(true);
				}
			} catch (error) {
				console.error(error);
			}
			setIsLoading(false);
		};
		checkAuth();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<AreaAdmin {...props} />
				) : (
					<Navigate to={{ pathname: "/login" }} />
				)
			}
		/>
	);
};

export default PrivateRoute;
