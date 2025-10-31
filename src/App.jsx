import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/common/Navbar";
import { CartProvider } from './component/context/CartContext';
import Footer from "./component/common/Footer";
import Home from "./component/pages/Home";
import CategoryListPage from "./component/pages/CategoryListPage";
import ProductDetailsPage from "./component/pages/ProductDetailsPage";

const App = () => {
    return (
        <BrowserRouter>
            <CartProvider>
                <Navbar />
                    <Routes>
                        <Route exact path="/" element={<Home/>} />
                        <Route path='/product/:productId' element={<ProductDetailsPage/>} />
                        <Route path='/categories' element={<CategoryListPage/>}/>
                    </Routes>
                <Footer />
            </CartProvider>
        </BrowserRouter>
    )
}

export default App;