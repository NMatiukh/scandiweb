import {
    BrowserRouter,
    Route,
    Routes
} from "react-router-dom";
import ProductList from "./components/ProductList";
import NotFound from "./components/NotFound";
import AddProduct from "./components/AddProduct";

export default function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductList/>}/>
                <Route path="addproduct" element={<AddProduct/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
