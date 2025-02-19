import { useState } from "react";
import "./App.css"
import ProductList from "./app/components/ProductList"
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

  const [showProductList, setShowProductList] = useState(false);

  const handleClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="container">
      <div className={`d-flex align-items-center ${showProductList ? 'invisible' : 'visible'}`}>
        <div className="mt-3"></div>
        <div className="container">
          <div className="container">
            <h1>Welcome To shopping lastest shoes</h1>
            <div className="mt-3"></div>
            <p>Get lastest shoes available online</p>

            <button className="btn btn outline-primary" onClick={handleClick}>
              Shop
            </button>
          </div>
        </div>

      </div>
      <div className={`container ${showProductList ? 'visible' : 'invisible'}`}>
        <ProductList products={products} />
      </div>
    </div>
  )
}

export default App;

const products = [
  {
    "id": "1",
    "name": "Sandels",
    "price": 20,
    "image": "",
    "description": ""
  },
  {
    "id": "2",
    "name": "Winter boots",
    "price": 100,
    "image": "",
    "description": ""
  }
]