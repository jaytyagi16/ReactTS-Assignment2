import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/Product";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCartItem } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { emailId, isLoggedIn } = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart.carts[emailId] || []);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const addToCart = (product: Product) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart.");
      return;
    }
    if (!cartState.some((item) => item.id === product.id)) {
      const updatedCart = [...cartState, product];
      setCartItems(updatedCart);
      dispatch(setCartItem({ userEmail: emailId, cartItems: updatedCart }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const cachedProducts = sessionStorage.getItem("products");
        if (cachedProducts) {
          const parsedProducts = JSON.parse(cachedProducts);
          setProducts(parsedProducts);
          setFilteredProducts(parsedProducts);
          setIsLoading(false);
          return;
        }
  
        const url = "https://fakestoreapi.com/products";
        const data = (await axios.get(url)).data;
        setProducts(data);
        setFilteredProducts(data);
        sessionStorage.setItem("products", JSON.stringify(data));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoggedIn && emailId) {
      setCartItems(cartState);
    }
  }, [isLoggedIn, emailId, cartState]);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
  }, []);

  const handleProductClick = (productId: number) => {
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    navigate(`/products/${productId}`);
  };

  return (
    <div className="max-w-screen">
      <div className="w-[90%] mx-auto mt-5">
        {/* header */}
        <Navbar />

        <SearchBar
          products={products}
          setFilteredProducts={setFilteredProducts}
        />

        {/* products */}
        {isLoading ? (
          <div className="flex items-center justify-center h-screen overflow-y-hidden">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="w-full mt-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="mx-2 p-5 hover:cursor-pointer hover:scale-102 transition-all duration-300"
                  onClick={() => handleProductClick(product.id)}
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
              <h2 className="text-center ">No products to show</h2>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
