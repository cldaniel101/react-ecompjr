import "./cards.css";

function Cards() {
	return (
		<section id="cards">
			<h1>Conheça-nos um pouco mais!</h1>
			<div id="cards-posicionados">
				<div className="card" id="card-valores">
					<img src="/icons/valores.svg" alt="Icone Valores" />
					<h1>Valores</h1>
					<p>
						Os valores de uma empresa guiam a conduta da mesma,
						portanto a Ecompjr baseia-se nos seguintes valores:
						Protagonismo, Cooperatividade Assiduidade, Resiliência,
						Constância em resultados, Evolução com os erros, Conexão
						com o movimento, Foco na qualidade, Ética e Empatia.
					</p>
				</div>
				<div id="cards-da-direita">
					<div className="card" id="card-missao">
						<img src="/icons/missao.svg" alt="Icone Missão" />
						<h1>Missão</h1>
						<p>
							Através da vivência empresarial e trabalho em
							equipe, formar profissionais inovadores,
							comprometidos e capazes de vencer desafios futuros.
						</p>
					</div>
					<div className="card" id="card-visao">
						<img src="/icons/visao.svg" alt="Icone Visão" />
						<h1>Visão</h1>
						<p>
							Ser uma empresa que realiza projetos de alto impacto
							mais conectada ao movimento empresa júnior e com
							grande reconhecimento dentro e fora da universidade.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Cards;
