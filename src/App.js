import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "pages/Home";
import Site from "pages/Site";
import "styles/App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id" exact component={Site} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
