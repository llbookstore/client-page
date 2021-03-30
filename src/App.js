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
import { getAllProducts, getCategories, getAuthors } from './actions/index'
function App(props) {
  const { user, onGetCategories, onGetProducts, onGetAuthors } = props;
  axios.defaults.baseURL = API_HOST;
  axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
  useEffect(() => {
    getBooks();
    getCategories();
    getAllAuthors();
  }, [])

  async function getBooks() {
    try {
      const res = await axios.get('/books?row_per_page=10000000&active=1');
      onGetProducts(res.data.data.rows);
    } catch (err) {
      console.log(err);
    }
  }

  async function getCategories() {
    try {
      const res = await axios.get('/category?active=1');
      onGetCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllAuthors() {
    try {
      const res = await axios.get('/author?row_per_page=1000000&active=1');
      onGetAuthors(res.data.data.rows);
    } catch (err) {
      console.log(err);
    }
  }
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
    onGetProducts: (products) => dispatch(getAllProducts(products)),
    onGetCategories: (categories) => dispatch(getCategories(categories)),
    onGetAuthors: (authors) => dispatch(getAuthors(authors))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);