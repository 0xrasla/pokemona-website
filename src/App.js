import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Info from "./components/Info";
import Favorites from "./pages/Favorites";
import { useState } from "react";

function App() {
  const [singleData, setsingleData] = useState(null);

  function getData(data) {
    setsingleData(data);
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home onClick={getData} />
          </Route>
          <Route path="/info" exact>
            <Info url={singleData} />
          </Route>
          <Route path="/fav" exact>
            <Favorites onClick={getData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
