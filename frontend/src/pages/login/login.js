import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./login.css";
import useAuth from "../../hooks/useAuth.js";

function Login() {
	const navigate = useNavigate();
	const goToRegisterPage = () => {
		navigate("/cadastro");
	};

	const goToHomePage = () => {
		navigate("/");
	};

	// const [username, setUsername] = useState("");
	// const [senha, setSenha] = useState("");
	// const [showAlert, setShowAlert] = useState(false);

	// const Acesso = async (event) => {
	// 	event.preventDefault();

	// 	try {
	// 		const response = await axios.post(
	// 			"http://127.0.0.1:8000/api/login/",
	// 			{
	// 				username: username,
	// 				password: senha,
	// 			}
	// 		);

	// 		const { access_token } = response.data;

	// 		localStorage.setItem("access_token", access_token);

	// 		navigate("/admin");
	// 	} catch (error) {
	// 		setShowAlert(true);
	// 		console.error(error);
	// 	}
	// };

	const { signin } = useAuth();

	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [error, setError] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();

		if (!email || !senha) {
			setError("Preencha todos os campos");
			return;
		}
		
		const res = signin(email, senha);
		
		if (res) {
			setError(res);
			return;
		} 

		// if (localStorage.getItem("access_token")) {
		//   navigate("/admin");
		//   return;
		// }

		navigate("/admin");
		
	  };
	  

	return (
		<div>
			<header>
				<a onClick={goToHomePage}>
					<img
						id="logo-cabecalho"
						src="img/nome_sem_fundo.png"
						alt="Logo Ecomp Jr"
					/>
				</a>
			</header>

			<main id="corpo-login">
				<h1 id="titulo-login">Login</h1>

				<div className="alert">{error}</div>

				<div id="formulario-login">
					<form id="form-login" autoComplete="on" onSubmit={handleLogin}>
						<p className="campos">
							<input
								type="text"
								name="email"
								id="iemail"
								placeholder="Email"
								maxLength={50}
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
									setError("");
								}}
								required
							/>
						</p>
						<p className="campos">
							<input
								type="password"
								name="senha"
								id="isenha"
								placeholder="Senha"
								maxLength={20}
								value={senha}
								onChange={(event) =>
									setSenha(event.target.value)
								}
								required
							/>
						</p>
						<p className="campos">
							<input
								id="botao-entrar"
								type="submit"
								value="Entrar"
							/>
						</p>
						<p id="legenda-cadastrar">
							Ainda não possui uma conta?{" "}
							<a onClick={goToRegisterPage}>Cadastre-se</a>
						</p>
					</form>
				</div>
			</main>
		</div>
	);
}

export default Login;
