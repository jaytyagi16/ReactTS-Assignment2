import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Product } from "../types/Product";
import star from "../assets/star.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Navbar from "../components/Navbar";
import { setCartItem } from "../redux/slices/cartSlice";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { emailId, isLoggedIn } = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart.carts[emailId] || []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isInCart = (product: Product | null): boolean => {
    return product ? cartState.some((item) => item.id === product.id) : false;
  };

  const addToCart = (product: Product): void => {
    if (!cartState.some((item) => item.id === product.id)) {
      const updatedCart = [...cartState, product];
      dispatch(
        setCartItem({
          userEmail: emailId,
          cartItems: updatedCart,
        })
      );
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        const url = `https://fakestoreapi.com/products/${productId}`;
        const response = await axios(url);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (productId) fetchProductDetails();
  }, [productId]);

  return (
    <div className="max-w-[90%] mx-auto mt-5">
      <Navbar />

      <p
        className="mt-4 text-blue-500 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        <span>{`<`}</span> Back
      </p>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen -mt-16">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-8 mx-auto px-4">
          <img
            src={product?.image}
            alt="Product Image"
            loading="lazy"
            className="w-full max-w-[300px] md:max-w-[350px] border rounded-xl p-4 object-contain"
          />

          <div className="w-full max-w-[90%] md:max-w-[50%]">
            <h2 className="text-2xl md:text-3xl font-semibold">{product?.title}</h2>
            <p className="mt-1 text-gray-600">{product?.category}</p>
            <p className="mt-4 text-sm md:text-base text-gray-700">{product?.description}</p>
            
            <div className="flex items-center gap-2 mt-4">
              <p className="text-lg">{product?.rating.rate}</p>
              <img src={star} alt="Star" loading="lazy" width={20} />
            </div>

            <p className="mt-4 font-bold text-xl">${product?.price}</p>
            {isLoggedIn ? (
              <button
                className={`bg-green-700 text-white rounded-xl p-2 px-3 mt-4 flex gap-2 transition-all duration-200 w-full md:w-auto justify-center items-center ${
                  isInCart(product) ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
                }`}
                onClick={() => product && addToCart(product)}
                disabled={isInCart(product)}
              >
                <FaShoppingCart className="text-lg" />
                <p className="text-sm">{isInCart(product) ? "Added to Cart" : "Add to Cart"}</p>
              </button>
            ) : (
              <em className="mt-4 block text-red-500">Please login to add to cart</em>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;