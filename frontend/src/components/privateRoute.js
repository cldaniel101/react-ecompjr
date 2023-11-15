import React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

// Verifica se o usuário está autenticado antes de renderizar seus filhos
const PrivateRoute = ({ children }) => {
	// Obtendo o estado de autenticação usando o hook useAuth
	const { signed } = useAuth();

	return signed > 0 ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
