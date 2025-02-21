import { useState } from "react";
import "./App.css"
import ProductList from "./app/components/ProductList"
import 'bootstrap/dist/css/bootstrap.min.css';

const products = [
  {
    "id": "1",
    "name": "Sandels",
    "price": 20,
    "image": "https://images.unsplash.com/photo-1626947346165-4c2288dadc2a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNob2V8ZW58MHx8MHx8fDA%3D",
    "description": ""
  },
  {
    "id": "2",
    "name": "Winter boots",
    "price": 100,
    "image": "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
    "description": ""
  },
  {
    "id": "1",
    "name": "Sandels",
    "price": 20,
    "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNob2V8ZW58MHx8MHx8fDA%3D",
    "description": ""
  },
  {
    "id": "2",
    "name": "Winter boots",
    "price": 100,
    "image": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2V8ZW58MHx8MHx8fDA%3D",
    "description": ""
  },
  {
    "id": "1",
    "name": "Sandels",
    "price": 20,
    "image": "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "description": ""
  },
  {
    "id": "2",
    "name": "Winter boots",
    "price": 100,
    "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    "description": ""
  },

];

const App = () => {

  const [showProductList, setShowProductList] = useState(false);

  const handleClick = () => {
    setShowProductList(true);
  };

  return (

    <div className="container-fluid position-relative">
      <div
        className={`jumbotron jumbotron-fluid d-flex justify-content-center align-items-center ${showProductList ? 'd-none' : 'd-block min-vh-100'} position-relative`}
      >
        <div
          className="position-absolute top-0 start-0 min-vh-100 min-vw-100"
          style={{
            backgroundImage: "url('/shop-9324665_1280.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.6,
            zIndex: 0
          }}
        ></div>

        <div className="container position-relative w-50" style={{ zIndex: 1 }}>
          <h1 className="display-4">Welcome to shopping latest shoes</h1>
          <p className="lead">Get lastest shoes available online</p>
          <hr className="my-4" />
          <p className="lead">
            <button className="btn btn-primary btn-lg" onClick={handleClick}>Go to shop</button>
          </p>
        </div>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <h3 className="mb-4">Welcome To Our Platform</h3>
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
      <div className={`container-fluid ${showProductList ? 'd-block min-vh-100' : 'd-none'}`}>
        <ProductList products={products} />
      </div>
    </div>
  )
}

export default App;