import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home.js'
import WaitingRoom from './components/WaitingRoom.js'
import SelectPlayers from './components/SelectPlayers.js'
import Game from './containers/Game.js'
import Results from './components/Results.js'

import './App.css';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/waiting-room" component={WaitingRoom} />
          <Route path="/select-players" component={SelectPlayers}/>
          <Route path="/play" component={Game}/>
          <Route path="/results" component={Results}/>
          {/* <Route component={Error}/> */}
        </Switch>
      </>
    </Router>
  );
}

export default App;
