import { useState } from "react";
import axios from "axios";

import "./login.css";

function Login() {
	return (
		<div>
			<header>
				<a href="#">  {/* Aqui será a rota para a página principal. */}
					<img
						id="logo-cabecalho"
						src="../../public/img/nome_sem_fundo.png"
						alt="Logo Ecomp Jr"
					/>
				</a>
			</header>

			<main>
				<h1>Login</h1>
				<div id="formulario">
					<form autocomplete="on" onsubmit="">
						<p>
							<input
								type="text"
								name="username"
								id="iusername"
								placeholder="Username"
								maxLength={20}
								required
							/>
						</p>
						<p>
							<input
								type="password"
								name="senha"
								id="isenha"
								placeholder="Senha"
								maxLength={20}
								required
							/>
						</p>
						<p>
							<input
								id="botao-entrar"
								type="submit"
								value="Entrar"
							/>
						</p>
						<p id="legenda-cadastrar">
							Ainda não possui uma conta?{" "}
							<a href="#">Cadastre-se</a>
						</p>
					</form>
				</div>
			</main>
		</div>
	);
}

export default Login;
