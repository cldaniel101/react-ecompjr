import { useState } from "react";
import axios from "axios";

import "./solicitacaoDeServico.css";
import validateEmail from "../../validate";

function SolicitacaoDeServico() {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [descricao, setDescricao] = useState("");
	const [showAlert, setShowAlert] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!validateEmail(email)) {
			setShowAlert(true);
			return;
		  }	

		try {
			const response = await axios.post(
				"http://127.0.0.1:8000/api/servicos",
				{
					"nome_completo": nome,
					"email": email,
					"descricao": descricao,
				}
			);

			setNome("");
			setEmail("");
			setDescricao("");
			setShowAlert(false)

			alert("Solicitação Enviada com sucesso!");
		} catch (error) {
			console.error(error);
		}
	};

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

				{showAlert && <div className="alert">E-mail inválido. Por favor, verifique seu e-mail.</div>}

				<form autoComplete="off" onSubmit={handleSubmit}>
					<p>
						<label htmlFor="inome">Nome Completo</label>
						<input
							type="text"
							name="nome"
							id="inome"
							maxLength={100}
							value={nome}
							onChange={(event) => setNome(event.target.value)}
							required
						/>
					</p>
					<p>
						<label htmlFor="iemail">Email</label>
						<input
							type="email"
							name="email"
							id="iemail"
							maxLength={100}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</p>
					<p>
						<label htmlFor="idescricao">Descrição</label>
						<textarea
							id="idescricao"
							name="descricao"
							rows="5"
							maxLength={300}
							placeholder="Faça uma breve descrição do serviço desejado."
							value={descricao}
							onChange={(event) =>
								setDescricao(event.target.value)
							}
							required
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
						rel="noreferrer"
					>
						Entre em Contato
					</a>
				</p>
			</div>
		</section>
	);
}

export default SolicitacaoDeServico;
