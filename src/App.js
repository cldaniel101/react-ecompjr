import Header from "./components/header/header";
import Entrada from "./components/entrada/entrada";
import QuemSomos from "./components/quemSomos/quemSomos";
import Cards from "./components/cards/cards";
import SolicitacaoDeServico from "./components/solicitacaoDeServico/solicitacaoDeServico";
import Footer from "./components/footer/footer";
import './mediaQuery.css'

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Entrada/>
        <QuemSomos/>
        <Cards/>
        <SolicitacaoDeServico/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
