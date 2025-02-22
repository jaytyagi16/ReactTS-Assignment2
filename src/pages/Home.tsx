import { useEffect, useState } from "react";
import heartFilled from "../assets/heartFilled.png";
import heartUnfilled from "../assets/heartUnfilled.png";
import ProductCard from "../components/ProductCard";
//import products from "../data/productData";
import { Product } from "../types/Product";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    if (!cartItems.some((item) => item.id === product.id)) {
      setCartItems((prevCart) => [...prevCart, product]);
    }
  };

  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async() => {
    try {
        const url = "https://fakestoreapi.com/products";
        const data = (await axios.get(url)).data;
        console.log("API Response is: ", data);
        setProducts(data);
    } catch (error) {
        console.log(error);   
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-screen">
      <div className="w-[90%] mx-auto mt-5">
        {/* header */}
        <Navbar/>

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
