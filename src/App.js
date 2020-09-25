import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import PokemonPage from './components/pokemon/PokemonPage'
import Index from './components/pokemon/Index'



function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Index}></Route>
        <Route path="/pokemon/:id" children={<PokemonPage />} />
      </Router>
    </>
  );
}

export default App;
