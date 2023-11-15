import React from "react";
import { Link } from "react-router-dom";

import "./header.css";
import { useNavigate } from "react-router-dom";

function Header() {
	const navigate = useNavigate()
	const goToAdminPage = () => {
		navigate("/admin")
	}

	return (
		<header>
			<img
				id="logo-cabecalho"
				src="/img/nome_sem_fundo.png"
				alt="Logo Ecomp Jr"
			/>
			<div id="menu">
				<p>
					<a href="#quem-somos">Sobre nós</a>
				</p>
				<p>
					<a
						href="https://www.ecomp.uefs.br/ecossistema/ecompjr"
						target="_blank"
						rel="noreferrer"
					>
						Contato
					</a>
				</p>
				<p>
					<a href="#">Carta de Serviço</a>
				</p>
				<p>
					<a id="admin" onClick={goToAdminPage}>Administrador</a>
				</p>
			</div>
			<div id="botao-cabecalho">
				<a href="#solicitacao-de-servico">
					<button className="solicitar-servico">
						Solicitar Serviço
					</button>
				</a>
			</div>
		</header>
	);
}

export default Header;
