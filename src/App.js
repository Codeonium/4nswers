import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home.js'

import './App.css';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Home}/>
          {/* <Route path="/select-players" component={SelectPlayers}/>
          <Route path="/play" component={Game}/>
          <Route path="/scores" component={Leadership}/>
          <Route component={Error}/> */}
        </Switch>
      </>
    </Router>
  );
}

export default App;
