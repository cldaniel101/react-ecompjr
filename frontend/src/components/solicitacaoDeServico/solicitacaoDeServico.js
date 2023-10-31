import "./solicitacaoDeServico.css";

function SolicitacaoDeServico() {
	return (
		<section id="solicitacao-de-servico">
			<div id="texto-solicitacao">
				<div id="dtext">
					<h1>Solicite seu serviço!</h1>
					<p>
						Bem-vindo à Ecomp Jr! Estamos entusiasmados em tê-lo
						conosco. Por favor, preencha o formulário ao lado para
						se solicitar seu serviço.
					</p>
				</div>
				<div id="dimg">
					<img src="/img/logo_completa.png" alt="Logo EcompJr" />
				</div>
			</div>
			<div id="formulario">
				<h2>Junte-se à nós!</h2>
				<p>
					Envie Sua Solicitação para Desfrutar dos Nossos Serviços de
					Qualidade!
				</p>
				<form autoComplete="off">
					<p>
						<label htmlFor="inome">Nome Completo</label>
						<input type="text" name="nome" id="inome" />
					</p>
					<p>
						<label htmlFor="iemail">Email</label>
						<input type="email" name="email" id="iemail" />
					</p>
					<p>
						<label htmlFor="idescricao">Descrição</label>
						<textarea
							id="idescricao"
							name="descricao"
							rows="5"
						></textarea>
					</p>
					<p>
						<input id="botao-enviar" type="submit" value="Enviar" />
					</p>
				</form>
				<p id="duvidas">
					Tem alguma dúvida?{" "}
					<a
						id="rodape-contato"
						href="https://www.ecomp.uefs.br/ecossistema/ecompjr"
						target="_blank"
					>
						Entre em Contato
					</a>
				</p>
			</div>
		</section>
	);
}

export default SolicitacaoDeServico;
