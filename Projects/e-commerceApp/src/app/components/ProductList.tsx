import { useAppDispatch } from "../hooks";
import { addToCart } from "../cartSlice";
import ProductCard from './ProductCard';
import type { Product } from '../cartSlice';
import { useState } from "react";
import Cart from "./Cart";

interface ProductListProp {
    products: Product[]
}

const ProductList: React.FC<ProductListProp> = ({ products }) => {
    const dispatch = useAppDispatch();
    const [showCart, setShowCart] = useState<boolean>(false);

    // Handler to dispatch the addProduct action
    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">e-commerceApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowCart(true)}
                    >
                        Open Cart
                    </button>
                </div>
            </nav>
            {
                !showCart ? (
                    <div className="container mt-4">
                        <h2>Product List</h2>
                        <div className="row">
                            {products.map((product: Product) => (
                                <ProductCard product={product} onAddToCart={handleAddToCart} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Cart setShowCart={setShowCart} />
                )}
        </>
    );
};

export default ProductList;
