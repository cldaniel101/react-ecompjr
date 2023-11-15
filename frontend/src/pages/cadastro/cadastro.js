import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth.js";
import "./cadastro.css";

function Cadastro() {
	const navigate = useNavigate();
	const goToLoginPage = () => {
		navigate("/login");
	};
	const goToHomePage = () => {
		navigate("/");
	};

	const [email, setEmail] = useState("");
	const [emailConf, setEmailConf] = useState("");
	const [senha, setSenha] = useState("");
	const [error, setError] = useState("");

	const { signup } = useAuth();

	// Função de manipulação para lidar com o processo de registro
	const handleSignup = () => {
		// Verificando se todos os campos foram preenchidos
		if (!email | !emailConf | !senha) {
			setError("Preencha todos os campos");
			return;
		} else if (email !== emailConf) {
			setError("Os e-mails não são iguais");
			return;
		}

		// Chamando a função de registro do hook de autenticação
		const res = signup(email, senha);

		// Verificando se houve algum erro durante o registro
		if (res) {
			setError(res);
			return;
		}

		// Exibindo uma mensagem de sucesso e redirecionando para a página de login
		alert("Usuário cadatrado com sucesso!");
		navigate("/login");
	};

	return (
		<div>
			<header>
				{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
				<a onClick={goToHomePage}>
					<img
						id="logo-cabecalho"
						src="img/nome_sem_fundo.png"
						alt="Logo Ecomp Jr"
					/>
				</a>
			</header>

			<main id="corpo-cadastro">
				<h1 id="titulo-cadastro">Cadastre-se</h1>
				<p id="legenda-titulo">
					Crie sua conta para acessar todas as solicitações de serviço
					da Ecomp Jr.
				</p>

				<div className="alert">
					{error}
				</div>

				<div id="formulario-cadastro">
					<form
						id="form-cadastro"
						autoComplete="off"
						onSubmit={handleSignup}
					>
						<p className="campos">
							<input
								type="email"
								name="email"
								id="iemail"
								placeholder="Email"
								maxLength={50}
								value={email}
								onChange={(event) =>
									setEmail(event.target.value)
								}
								required
							/>
						</p>
						<p className="campos">
							<input
								type="text"
								name="emailConf"
								id="iemailConf"
								placeholder="Confirme seu Email"
								maxLength={50}
								value={emailConf}
								onChange={(event) =>
									setEmailConf(event.target.value)
								}
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
								id="botao-cadastrar"
								type="submit"
								value="Cadastrar"
							/>
						</p>
						<p id="legenda-entrar">
							Já possui uma conta?{" "}
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<a onClick={goToLoginPage}>Entrar</a>
						</p>
					</form>
				</div>
			</main>
		</div>
	);
}

export default Cadastro;
