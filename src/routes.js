import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Favourtites from './components/Favourtites';
import SearchProduct from './components/SearchProduct';
import CategoryDetail from './components/CategoryDetail';
import Cart from './components/Cart';
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
]

export default router;