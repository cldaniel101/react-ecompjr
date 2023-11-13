function ListServicos({ servicos }) {
	console.log(servicos);
	return (
		<>
			{servicos.map((servicos, i) => (
				<section key={i} className="servico">
					<div id="nome-completo">
						<h2>Nome Completo</h2>
						<p>{servicos.nome_completo}</p>
					</div>
					<div id="email">
						<h2>Email</h2>
						<p>{servicos.email}</p>
					</div>
					<div id="descricao">
						<h2>Descrição</h2>
						<p>{servicos.descricao}</p>
					</div>
					<button id="bt-update">Update</button>
					<button id="bt-delete">Delete</button>
					<span>ID: {servicos.id}</span>
				</section>
			))}
		</>
	);
}

export default ListServicos;
