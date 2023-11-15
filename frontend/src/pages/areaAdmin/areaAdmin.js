import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ListServicos from "../../components/listServicos/listServicos";
import useAuth from "../../hooks/useAuth";
import "./areaAdmin.css";

function AreaAdmin() {
	const { signout } = useAuth();
	const [servicos, setServicos] = useState([]);

	// Função para buscar dados da API e atualizar o estado
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

	// Efeito que executa a busca de dados quando o componente é montado ou quando setServicos é atualizado
	useEffect(() => {
		buscaDados();
	}, [setServicos]);

	// Função para deletar um serviço pelo ID
	const deletarServico = async (id) => {
		try {
			await axios.delete(`http://localhost:8000/api/servicos/${id}`);

			buscaDados();
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

	// Renderização do componente da área do administrador
	return (
		<div>
			<header id="cabecalho-areaAdmin">
				<button onClick={goToHomePage}>
					<img
						id="logo-cabecalho"
						src="img/nome_sem_fundo.png"
						alt="Logo Ecomp Jr"
					/>
				</button>
				<button id="botao-sair" onClick={() => [signout(), navigate("/login")]}>
					Encerrar Sessão
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

				<ListServicos
					servicos={servicos}
					onClickDelete={handleExcluirServico}
				/>
			</main>
		</div>
	);
}

export default AreaAdmin;
