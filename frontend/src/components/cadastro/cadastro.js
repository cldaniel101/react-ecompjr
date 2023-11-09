import { useState } from "react";
import axios from "axios";

import "./cadastro.css";

function Cadastro() {
	return (
		<div>
			<header>
				<a href="#">
					<img
						id="logo-cabecalho"
						src="../../public/img/nome_sem_fundo.png"
						alt="Logo Ecomp Jr"
					/>
				</a>
			</header>

			<main>
				<h1>Cadastre-se</h1>
				<p>
					Crie sua conta para acessar todas as solicitações de serviço
					da Ecomp Jr.
				</p>
				<div id="formulario">
					<form autocomplete="off" onsubmit="">
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
								type="email"
								name="email"
								id="iemail"
								placeholder="Email"
								maxLength={50}
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
								id="botao-cadastrar"
								type="submit"
								value="Cadastrar"
							/>
						</p>
						<p id="legenda-entrar">
							Já possui uma conta? <a href="#">Entrar</a>
						</p>
					</form>
				</div>
			</main>
		</div>
	);
}

export default Cadastro