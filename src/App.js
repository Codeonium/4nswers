import './App.css';

function App() {
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/select-players" component={SelectPlayers}/>
          <Route path="/play" component={Game}/>
          <Route path="/scores" component={Game}/>
          <Route path="/play" component={Game}/>
          <Route component={Error}/>
        </Switch>
      </>
    </Router>
  );
}

export default App;
