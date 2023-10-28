import Header from "./components/header/header";
import Entrada from "./components/entrada/entrada";
import QuemSomos from "./components/quemSomos/quemSomos";
import Cards from "./components/cards/cards";

function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <Entrada/>
        <QuemSomos/>
        <Cards/>
      </main>
    </div>
  );
}

export default App;
