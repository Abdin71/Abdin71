import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart } from "../cartSlice";
import ProductCard from './ProductCard';
import type { Product } from '../cartSlice';
import { useState } from "react";
import Cart from "./Cart";
import type { RootState } from '../store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

interface ProductListProp {
    products: Product[]
}

const ProductList: React.FC<ProductListProp> = ({ products }) => {
    const dispatch = useAppDispatch();
    const [showCart, setShowCart] = useState<boolean>(false);
    const itemCount = useAppSelector((state: RootState) => state.cart.cartItems.length);

    // Handler to dispatch the addProduct action
    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ height: '100px', width: '100%', backgroundColor: '#d9ead3' }}>
                <div className="container">
                    <a className="navbar-brand" href="/">E-Shoes</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                        </ul>
                        <div className="d-flex flex-row align-items-center">
                            <form className="d-flex form-inline my-2 my-lg-0">
                                <input className="form-control mx-3 mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                                <FontAwesomeIcon className="pt-2" icon={faMagnifyingGlass} size={"xl"} />
                            </form>
                            {showCart ? (
                                <button
                                    className="btn btn-success mx-2 me-2"
                                    onClick={() => setShowCart(false)}
                                >
                                    Close Cart
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-success mx-3 me-2"
                                    onClick={() => setShowCart(true)}
                                >
                                    <div className="position-relative">
                                        <span>
                                            <FontAwesomeIcon icon={faCartShopping} size="2x" />
                                        </span>
                                        <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger" style={{ zIndex: 1 }}>
                                            {itemCount}
                                        </span>
                                    </div>

                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {
                !showCart ? (
                    <div className="container mt-4">
                        <h2>Product List</h2>
                        <div className="d-flex flex-wrap">
                            {products.map((product: Product, index) => (
                                <ProductCard key={index} product={product} onAddToCart={handleAddToCart} />
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
