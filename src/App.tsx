import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/user.action';
import Spinner from './components/spinner/spinner.component';
import { GlobalStyles } from './global.styles';

const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Authentication = lazy(() => import('./routes/authentication/authentication.component'));

const App = () => {
    // dispatch will never change and will not make rerender
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);

    return (
        <Suspense fallback={<Spinner />}>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="auth" element={<Authentication />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
