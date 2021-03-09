import 'antd/dist/antd.css';
import './App.scss';
import axios from 'axios'
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import { API_HOST } from './constants/config'
function App() {
  axios.defaults.baseURL = API_HOST;
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
