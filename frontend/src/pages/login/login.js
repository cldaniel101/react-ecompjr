import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./login.css";

function Login() {
	const navigate = useNavigate()
	const goToRegisterPage = () => {
		navigate("/cadastro")
	}

	const goToHomePage = () => {
		navigate("/")
	}

	const [username, setUsername] = useState("");
	const [senha, setSenha] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const Acesso = async (event) => {
		event.preventDefault();

		// if (!validateEmail(email)) {
		// 	setShowAlert(true);
		// 	return;
		//   }	

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/login/",
				{
					"username": username,
					"password": senha,
				}
			);

			alert("Acesso realizado com sucesso!");

		} catch (error) {
			console.error(error);
		}
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
				<div id="formulario-login">
					<form id="form-login" autoComplete="on" onSubmit={Acesso}>
						<p className="campos">
							<input
								type="text"
								name="username"
								id="iusername"
								placeholder="Username"
								maxLength={20}
								value={username}
								onChange={(event) => setUsername(event.target.value)}
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
								onChange={(event) => setSenha(event.target.value)}
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
