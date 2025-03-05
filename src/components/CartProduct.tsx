import React from "react";
import { RiDeleteBin7Fill } from "react-icons/ri";

interface CartProductProps {
  title: string;
  description: string;
  price: number;
  image: string;
  _id: number;
  removeProduct: (id: number) => void
}

const CartProduct: React.FC<CartProductProps> = (props) => {
  const { title, description, price, image, _id, removeProduct } = props;

  return (
    <div className="flex items-center gap-6 bg-white shadow-md p-4 rounded-lg w-full">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={image}
          alt="Product"
          className="w-full h-full object-contain p-2"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-gray-600 line-clamp-2" title={description}>
          {description.split(" ").slice(0, 20).join(" ") + "..."}
        </p>
        <div className="flex justify-between items-center mt-3">
          <p className="font-bold text-lg text-green-700">${price}</p>
          <RiDeleteBin7Fill className="text-red-500 text-xl cursor-pointer hover:text-red-700 transition" 
            onClick={() => removeProduct(_id)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;