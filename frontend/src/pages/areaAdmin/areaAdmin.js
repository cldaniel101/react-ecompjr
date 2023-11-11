import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./areaAdmin.css";

function AreaAdmin() {
    const navigate = useNavigate()
    const goToHomePage = () => {
		navigate("/")
	}

	return (
		<div>
			<header>
				<a onClick={goToHomePage}>
					<img
						id="logo-cabecalho"
						src="img/nome_sem_fundo.png"
						alt="Logo Ecomp Jr"
					/>
				</a>
			</header>

			<main id="corpo-admin">
				<section id="titulo">
					<h1>Área do Administrador</h1>
					<p>
						A seguir estão todas as solicitações de serviço feitas
						para a EcompJr.
					</p>
				</section>
				<section className="servico">
					<div id="nome-completo">
						<h2>Nome Completo</h2>
						<p>Cláudio Daniel Figueredo Peruna</p>
					</div>
					<div id="email">
						<h2>Email</h2>
						<p>danielperuna2012@gmail.com</p>
					</div>
					<div id="descricao">
						<h2>Descrição</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Totam, tenetur eaque voluptas eos quae libero,
							itaque velit, eum dolores earum molestiae? Ullam
							nihil laudantium iure veritatis perspiciatis vitae
							officia corporis? Lorem ipsum dolor, sit amet
							consectetur adipisicing elit. Laudantium quae ab
							praesentium cum consectetur! Necessitatibus facilis
							totam voluptate, excepturi velit, pariatur
							architecto cumque ipsum dolores placeat
							reprehenderit. Debitis, beatae eaque!
						</p>
					</div>
					<button id="bt-update">Update</button>
					<button id="bt-delete">Delete</button>
				</section>
				<section className="servico">
					<div id="nome-completo">
						<h2>Nome Completo</h2>
						<p>Cláudio Daniel Figueredo Peruna</p>
					</div>
					<div id="email">
						<h2>Email</h2>
						<p>danielperuna2012@gmail.com</p>
					</div>
					<div id="descricao">
						<h2>Descrição</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Totam, tenetur eaque voluptas eos quae libero,
							itaque velit, eum dolores earum molestiae? Ullam
							nihil laudantium iure veritatis perspiciatis vitae
							officia corporis?
						</p>
					</div>
					<button id="bt-update">Update</button>
					<button id="bt-delete">Delete</button>
				</section>
			</main>
		</div>
	);
}

export default AreaAdmin