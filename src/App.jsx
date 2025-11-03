import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from './service/Guard';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from "./component/common/Navbar";
import { CartProvider } from './component/context/CartContext';
import Footer from "./component/common/Footer";
import Home from "./component/pages/Home";
import CategoryListPage from "./component/pages/CategoryListPage";
import ProductDetailsPage from "./component/pages/ProductDetailsPage";
import CategoryProductsPage from "./component/pages/CategoryProductsPage";
import CartPage from "./component/pages/CartPage";
import RegisterPage from "./component/pages/RegisterPage";
import LoginPage from "./component/pages/LoginPage";
import ProfilePage from "./component/pages/ProfilePage";
import AddressPage from "./component/pages/AddressPage";
import AdminPage from './component/admin/AdminPage';
import AdminCategoryPage from './component/admin/AdminCategoryPage';
import AddCategory from './component/admin/AddCategory';
import EditCategory from './component/admin/EditCategory';
import AdminProductPage from './component/admin/AdminProductPage';
import AddProductPage from './component/admin/AddProductPage';
import EditProductPage from './component/admin/EditProductPage';
import AdminOrdersPage from './component/admin/AdminOrdersPage';
import AdminOrderDetailsPage from './component/admin/AdminOrderDetailsPage';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const App = () => {
    return (
        <BrowserRouter>
            <CartProvider>
                <Elements stripe={stripePromise}>
                    <Navbar />
                        <Routes>
                            <Route exact path="/" element={<Home/>} />
                            <Route path='/product/:productId' element={<ProductDetailsPage/>} />
                            <Route path='/categories' element={<ProtectedRoute element={<CategoryListPage/>} />}/>
                            <Route path='/category/:categoryId' element={<ProtectedRoute element={<CategoryProductsPage/>} />}/>
                            <Route path='/cart' element={<ProtectedRoute element={<CartPage/>} />}/>
                            <Route path='/register' element={<RegisterPage/>}/>
                            <Route path='/login' element={<LoginPage/>}/>

                            <Route path='/profile' element={<ProtectedRoute element={<ProfilePage/>} />} />
                            <Route path='/add-address' element={<ProtectedRoute element={<AddressPage/>} />} />
                            <Route path='/edit-address' element={<ProtectedRoute element={<AddressPage/>} />} />

                            <Route path='/admin' element={<AdminRoute element={<AdminPage/>} />} />
                            <Route path='/admin/categories' element={<AdminRoute element={<AdminCategoryPage/>} />} />
                            <Route path='/admin/add-category' element={<AdminRoute element={<AddCategory/>} />} />
                            <Route path='/admin/edit-category/:categoryId' element={<AdminRoute element={<EditCategory/>} />} />
                            <Route path='/admin/products' element={<AdminRoute element={<AdminProductPage/>} />} />
                            <Route path='/admin/add-product' element={<AdminRoute element={<AddProductPage/>} />} />
                            <Route path='/admin/edit-product/:productId' element={<AdminRoute element={<EditProductPage/>} />} />

                            <Route path='/admin/orders' element={<AdminRoute element={<AdminOrdersPage/>} />} />
                            <Route path='/admin/order-details/:itemId' element={<AdminRoute element={<AdminOrderDetailsPage/>} />} />
                        </Routes>
                    <Footer />
                </Elements>
            </CartProvider>
        </BrowserRouter>
    )
}

export default App;