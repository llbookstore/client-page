import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import Favourtites from './components/Favourtites';
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
    }
]

export default router;