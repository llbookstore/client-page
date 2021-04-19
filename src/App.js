import { useEffect } from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.scss';
import axios from 'axios'
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import { API_HOST } from './constants/config'
import { isAuth } from './utils/common'
import { getAuthors } from './actions/AuthorActions'
import { getCategories } from './actions/CategoryActions'
import { getPublishingHouses } from './actions/PublishingHouseActions'
import { getAllBooks } from './actions/BookActions'
import { logout } from './actions/index'
function App(props) {
  const { user, onGetCategories, onGetBooks, onGetPublishingHouses, onGetAuthors, onLogout } = props;
  axios.defaults.baseURL = API_HOST;
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  useEffect(() => {
    onGetBooks();
    onGetAuthors();
    onGetCategories();
    onGetPublishingHouses();
  }, [onGetBooks, onGetAuthors, onGetCategories, onGetPublishingHouses])
  useEffect(() => {
    if(user.token && !isAuth(user.token)){
      onLogout();
    }
  }, [user.token, onLogout])

  useEffect(() => {
    document.body.style.backgroundColor = "#19b3b1"
  },[])
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
const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetBooks: () => dispatch(getAllBooks()),
    onGetCategories: () => dispatch(getCategories()),
    onGetAuthors: () => dispatch(getAuthors()),
    onGetPublishingHouses: () => dispatch(getPublishingHouses()),
    onLogout: () => dispatch(logout()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);