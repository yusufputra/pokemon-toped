import logo from "./logo.svg";
import "./App.css";
import { Switch, Link, Route } from "react-router-dom";
import MyPoke from "./pages/MyPoke";
import PokeList from "./pages/PokeList";
import PokeDetail from "./pages/PokeDetail";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={MyPoke} />
        <Route path={"/pokeDetail"} component={PokeDetail} />
        <Route path={"/pokeList"} component={PokeList} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
