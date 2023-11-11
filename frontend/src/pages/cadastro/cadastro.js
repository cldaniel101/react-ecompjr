import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./cadastro.css";
import validateEmail from "../../validate";



function Cadastro() {
	const navigate = useNavigate()
	const goToLoginPage = () => {
		navigate("/login")
	}

	const goToHomePage = () => {
		navigate("/")
	}
	
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const Cadastro = async (event) => {
		event.preventDefault();

		if (!validateEmail(email)) {
			setShowAlert(true);
			return;
		  }	

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/users",
				{
					"username": username,
					"email": email,
					"password": senha,
					"is_admin": false
				  }
			);

			alert("Solicitação Enviada com sucesso!");

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

			<main id="corpo-cadastro">
				<h1 id='titulo-cadastro'>Cadastre-se</h1>
				<p id="legenda-titulo">
					Crie sua conta para acessar todas as solicitações de serviço
					da Ecomp Jr.
				</p>
				{showAlert && <div className="alert">E-mail inválido. Por favor, verifique seu e-mail.</div>}

				<div id="formulario-cadastro">
					<form id="form-cadastro" autoComplete="off" onSubmit={Cadastro}>
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
								type="email"
								name="email"
								id="iemail"
								placeholder="Email"
								maxLength={50}
								value={email}
								onChange={(event) => setEmail(event.target.value)}
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
								id="botao-cadastrar"
								type="submit"
								value="Cadastrar"
							/>
						</p>
						<p id="legenda-entrar">
							Já possui uma conta? <a onClick={goToLoginPage}>Entrar</a>
						</p>
					</form>
				</div>
			</main>
		</div>
	);
}

export default Cadastro