import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./areaAdmin.css";
import ListServicos from "../../components/listServicos/listServicos";

function AreaAdmin() {
	const [servicos, setServicos] = useState([]);

	const buscaDados = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8000/api/servicos"
			);
			setServicos(response.data);
		} catch (error) {
			console.error("Erro ao buscar dados da API:", error);
		}
	};

	useEffect(() => {
		buscaDados();
	}, [setServicos]);

	const deletarServico = async (id) => {
		try {
			await axios.delete(`http://localhost:8000/api/servicos/${id}`);
			console.log("DELETED");

			buscaDados()

		} catch (error) {
			console.error("Erro ao deletar serviço:", error);
		}
	};

	const handleExcluirServico = (id) => {
		deletarServico(id);
	};

	const navigate = useNavigate();
	const goToHomePage = () => {
		navigate("/");
	};

	return (
		<div>
			<header>
				<button onClick={goToHomePage}>
					<img
						id="logo-cabecalho"
						src="img/nome_sem_fundo.png"
						alt="Logo Ecomp Jr"
					/>
				</button>
			</header>

			<main id="corpo-admin">
				<section id="titulo">
					<h1>Área do Administrador</h1>
					<p>
						A seguir estão todas as solicitações de serviço feitas
						para a EcompJr.
					</p>
				</section>

				<ListServicos servicos={servicos} onClickDelete={handleExcluirServico} />
			</main>
		</div>	
	);
}

export default AreaAdmin;
