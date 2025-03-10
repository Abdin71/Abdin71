import type { Product } from '../cartSlice';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    return (
        <div className="card m-4 border border-primary" style={{ width: '18rem' }}>
            <img className="card-img-top" src={product.image} alt="Card image cap" style={{ height: '290px', width: '232', }} ></img>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.price} kr</p>
                <button className="btn btn-success border border-primary" onClick={() => onAddToCart(product)}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
