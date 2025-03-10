import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import type { RootState } from '../store';
import { addToCart, removeFromCart, updateQuantity, clearCart } from "../cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

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
    <div className="card w-75 mx-auto mt-5">
      <div className="card-header">
        Cart
      </div>
      {cartItems.length === 0 ? (
        <div className="card-body text-center">
          <p>Your cart is empty.</p>
          <hr />
        </div>
      ) : (
        <div className="list-group list-group-flush">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="list-group-item d-flex flex-row justify-content-between align-items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100px", height: "100px" }}
              />
              <h5>{item.name}</h5>
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
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(item.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>

              <p>Price: {item.price} kr</p>
            </div>
          ))}
        </div>
      )}
      <div className="d-flex flex-row justify-content-between mt-3 p-3">
        <h4>Total: {totalPrice.toFixed(2)} kr</h4>
        <button
          className="btn btn-success"
        >
          Checkout
        </button>
      </div>
    </div>

  );
};

export default Cart;
