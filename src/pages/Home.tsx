import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
//import products from "../data/productData";
import { Product } from "../types/Product";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCartItem } from "../redux/slices/cartSlice";

const Home = () => {
  //consider removing
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const { emailId, isLoggedIn } = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart.carts[emailId] || []);
  const dispatch = useAppDispatch();

  const addToCart = (product: Product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart.");
      return;
    }
    if (!cartState.some((item) => item.id === product.id)) {
      const updatedCart = [...cartState, product];
      //consider removing
      setCartItems(updatedCart);
      dispatch(setCartItem({ userEmail: emailId, cartItems: updatedCart }));
    }
  };

  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const url = "https://fakestoreapi.com/products";
      const data = (await axios.get(url)).data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoggedIn && emailId) {
      setCartItems(cartState);
    }
  }, [isLoggedIn, emailId, cartState]);

  return (
    <div className="max-w-screen">
      <div className="w-[90%] mx-auto mt-5">
        {/* header */}
        <Navbar />

        {/* products */}
        <div className="w-full mt-10 grid grid-cols-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="mx-2 p-5 hover:cursor-pointer hover:scale-102 transition-all duration-300"
              >
                <ProductCard
                  {...product}
                  isLoggedIn={isLoggedIn}
                  addToCart={() => addToCart(product)}
                  isInCart={cartItems.some((item) => item.id === product.id)}
                />
              </div>
            ))
          ) : (
            <h2>No Products to show</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
