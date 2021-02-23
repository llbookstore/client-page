import './App.scss';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <section >
          <Switch>
            {
              routes.map((route, index) =>
                <Route key={index} {...route} />
              )
            }
          </Switch>
        </section>
      </div>
    </Router>
  );
}

export default App;
