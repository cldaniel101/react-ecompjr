import './header.css'
import React from 'react';

function Header() {
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
					>
						Contato
					</a>
				</p>
				<p>
					<a href="#">Carta de Serviço</a>
				</p>
			</div>
			<div id="botao-cabecalho">
				<a href="#solicitacao-de-servico">
					<button className="solicitar-servico">Solicitar Serviço</button>
				</a>
			</div>
		</header>
	);
}

export default Header