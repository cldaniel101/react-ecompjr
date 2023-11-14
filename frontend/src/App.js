import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Cadastro from "./pages/cadastro/cadastro";
import Login from "./pages/login/login";
import AreaAdmin from "./pages/areaAdmin/areaAdmin";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<PrivateRoute component={AreaAdmin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
