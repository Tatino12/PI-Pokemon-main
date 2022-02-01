import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';


function App() {
  return ( // el switch va a envolver cada ruta y va a ir yendo de ruta en ruta,si hay una ruta inexistente el switch hace que te tome el ultimo que exista. Se va a ir moviendo dentro de lo que envuelve
    <BrowserRouter>
    <div className="App">
      <Switch> 
          <Route exact path='/' component = {LandingPage}/>
          <Route path= '/home' component = {Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
