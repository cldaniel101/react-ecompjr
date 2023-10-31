import "./entrada.css";

function Entrada() {
	return (
		<section id="entrada">
			<div>
				<h1>Olá,</h1>
				<p>
					Bem-vindo(a) à Ecomp Jr! Estamos prontos para atender às
					suas necessidades. Por favor, preencha o formulário abaixo
					para nos enviar sua solicitação de serviço.
				</p>
				<a href="#solicitacao-de-servico">
					<button className="solicitar-servico">Solicitar Serviço</button>
				</a>
			</div>
			<img
				id="logo-entrada"
				src="/img/logo_completa.png"
				alt="Logo Ecomp Jr"
			/>
		</section>
	);
}

export default Entrada;
