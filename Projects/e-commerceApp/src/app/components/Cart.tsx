import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import type { RootState } from '../store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from "../cartSlice";

interface CartProps {
  setShowCart: (showCart: boolean) => void;

}

const Cart: React.FC<CartProps> = ({ setShowCart }) => {
  const cartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId: id, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="list-group">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-3">
        <h4>Total: ${totalPrice.toFixed(2)}</h4>
      </div>
      <button
        className="btn btn-primary"
        onClick={() => setShowCart(false)}
      >
        Close
      </button>
    </div>

  );
};

export default Cart;
