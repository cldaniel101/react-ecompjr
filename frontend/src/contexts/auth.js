import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

// Provedor de autenticação que utiliza o contexto e gerencia o estado de autenticação
export const AuthProvider = ({ children }) => {
	const initialUser = JSON.parse(localStorage.getItem("user_info")) || null;
	const [user, setUser] = useState(initialUser);

	// Efeito para verificar e carregar o usuário ao iniciar a aplicação
	useEffect(() => {
		const userToken = localStorage.getItem("user_token");
		const usersStorage = localStorage.getItem("users_bd");

		if (userToken && usersStorage) {
			const hasUser = JSON.parse(usersStorage)?.filter(
				(user) => user.email === JSON.parse(userToken).email
			);

			if (hasUser) setUser(hasUser[0]);
		}
	}, []);

	// Efeito para salvar o usuário no localStorage sempre que ele for atualizado
	useEffect(() => {
		localStorage.setItem("user_info", JSON.stringify(user));
	}, [user]);

	// Função de login que verifica as credenciais e atualiza o estado de autenticação
	const signin = (email, password) => {
		const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

		const hasUser = usersStorage?.filter((user) => user.email === email);

		if (hasUser?.length) {
			if (
				hasUser[0].email === email &&
				hasUser[0].password === password
			) {
				const token = Math.random().toString(36).substring(2);
				localStorage.setItem(
					"user_token",
					JSON.stringify({ email, token })
				);
				setUser({ email, password });
				return;
			} else {
				return "E-mail ou senha incorretos";
			}
		} else {
			return "Usuário não cadastrado";
		}
	};

	// Função de registro que adiciona um novo usuário ao localStorage
	const signup = (email, password) => {
		const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

		const hasUser = usersStorage?.filter((user) => user.email === email);

		if (hasUser?.length) {
			return "Já tem uma conta com esse E-mail";
		}

		let newUser;

		if (usersStorage) {
			newUser = [...usersStorage, { email, password }];
		} else {
			newUser = [{ email, password }];
		}

		localStorage.setItem("users_bd", JSON.stringify(newUser));

		return;
	};

	// Função de logout que limpa o estado de autenticação e remove o token do localStorage
	const signout = () => {
		setUser(null);
		localStorage.removeItem("user_token");
	};

	// Fornece o contexto de autenticação para os componentes filhos
	return (
		<AuthContext.Provider
			value={{ user, signed: !!user, signin, signup, signout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
