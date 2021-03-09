import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
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
    }
]

export default router;