import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Product } from "../types/Product";
import star from "../assets/star.png";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import shoppingCartIcon from "../assets/shopping-cart.png";
import Navbar from "../components/Navbar";
import { setCartItem } from "../redux/slices/cartSlice";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { emailId, isLoggedIn } = useAppSelector((state) => state.auth);
  const cartState = useAppSelector((state) => state.cart.carts[emailId] || []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isInCart = (product: Product | null): boolean => {
    if (product && cartState.some((item) => item.id === product.id)) {
      return true;
    } else return false;
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
        <div className="flex justify-around mt-20 gap-5  mx-auto">
          <img
            src={product?.image}
            alt="Product Image"
            loading="lazy"
            className="max-w-[350px] border rounded-xl p-4 object-fit"
          />

          <div className="max-w-[50%]">
            <h2 className="text-3xl font-semibold">{product?.title}</h2>
            <p className="mt-1">{product?.category}</p>
            <p className="mt-6 w-fit">{product?.description}</p>
            <div className="flex items-center gap-2 mt-6">
              <p>{product?.rating.rate}</p>
              <img src={star} alt="Star" loading="lazy" width={20} />
            </div>
            <p className="mt-6 font-bold text-xl">${product?.price}</p>
            {isLoggedIn ? (
              <button
                className={`bg-green-700 text-white rounded-xl p-2 px-3 mt-6 w-fit flex gap-2 cursor-pointer transition-all duration-200 ${
                  isInCart(product)
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-green-600"
                }`}
                onClick={() => product && addToCart(product)}
              >
                <img
                  src={shoppingCartIcon}
                  alt="CartIcon"
                  width={20}
                  height={19}
                  loading="lazy"
                />
                <p>{isInCart(product) ? "Added to Cart" : "Add to Cart"}</p>
              </button>
            ) : (
              <em>Please login to add to cart</em>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
