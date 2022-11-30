import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
import ProductDetail from './components/products/Product/product-description/ProductDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Backdrop, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const updatedCart = await commerce.cart.retrieve();
    setCart(updatedCart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const updatedCart = await commerce.cart.add(productId, quantity);
    setCart(updatedCart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const updatedCart = await commerce.cart.update(productId, { quantity });
    setCart(updatedCart);
  };

  const handleRemoveFromCart = async (productId) => {
    const updatedCart = await commerce.cart.remove(productId);
    setCart(updatedCart);
  };

  const handleEmptyCart = async () => {
    const updatedCart = await commerce.cart.empty();
    setCart(updatedCart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      // for test:
      handleEmptyCart();

      // for live:
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  console.log(products, cart);

  useEffect(() => {
    fetchProducts();
    fetchCart();
    if (cart) {
      setLoaded(true);
    } else return null;
  }, [loaded]);

  return loaded ? (
    <BrowserRouter>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route
            path="/"
            element={
              <Products products={products} loaded={loaded} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
          <Route
            path="/productdetail"
            element={
              <ProductDetail products={products} onAddToCart={handleAddToCart} />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  ) : (
    <Backdrop className={classes.backdrop} open>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default App;
