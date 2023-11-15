import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth.js";
import "./login.css";

function Login() {
	const navigate = useNavigate();
	const goToRegisterPage = () => {
		navigate("/cadastro");
	};
	const goToHomePage = () => {
		navigate("/");
	};

	const { signin } = useAuth();

	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [error, setError] = useState("");

	// Função de manipulação para lidar com o processo de login
	const handleLogin = (e) => {
		e.preventDefault();

		// Verificando se todos os campos foram preenchidos
		if (!email || !senha) {
			setError("Preencha todos os campos");
			return;
		}

		const res = signin(email, senha);

		// Verificando se houve algum erro durante o login
		if (res) {
			setError(res);
			return;
		}

		// Redirecionando para a página do administrador após o login bem-sucedido
		navigate("/admin");
	};

	// Renderização do componente da página de login
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
					<form
						id="form-login"
						autoComplete="on"
						onSubmit={handleLogin}
					>
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
