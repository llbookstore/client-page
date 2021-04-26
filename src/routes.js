import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Favourtites from './components/Favourtites';
import SearchProduct from './components/SearchProduct';
import CategoryDetail from './components/CategoryDetail';
import Cart from './components/Cart';
import Payment from './components/Payment/index';
import Author from './components/Author';
import PublishingHouse from './components/PublishingHouse';
import CheckOrder from './components/CheckOrder';
import OrderDetails from './components/OrderDetails';
import News from './components/News';
import NewsDetails from './components/NewsDetails';
import UnFindPage from './components/UnFindPage';
const router = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/book/:id',
        exact: true,
        component: ProductDetail
    },
    {
        path: '/favourite',
        exact: true, 
        component: Favourtites
    },
    {
        path: '/search',
        exact: true, 
        component: SearchProduct
    },
    {
        path: '/category/:id',
        exact: true, 
        component: CategoryDetail
    },
    {
        path: '/cart',
        exact: true, 
        component: Cart
    },
    {
        path: '/payment',
        exact: true, 
        component: Payment
    },
    {
        path: '/author/:id',
        exact: true, 
        component: Author
    },
    {
        path: '/publishing_house/:id',
        exact: true, 
        component: PublishingHouse
    },
    {
        path: '/check-order',
        exact: true, 
        component: CheckOrder
    },
    {
        path: '/check-order/:id',
        exact: true, 
        component: OrderDetails
    },
    {
        path: '/news',
        exact: true, 
        component: News
    },
    {
        path: '/news/:id',
        exact: true, 
        component: NewsDetails
    },
    {
        path: '/',
        component: UnFindPage
    },
]

export default router;