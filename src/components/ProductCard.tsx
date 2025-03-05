import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import star from "../assets/star.png"
import { Product } from '../types/Product'

interface ProductCardProps extends Product{
    isLoggedIn?: boolean;
    addToCart: () => void;
    isInCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const {image, title, description, rating, price, isLoggedIn = false, addToCart, isInCart} = props;
  return (
    <div>
        <div className='flex flex-col gap-2 border rounded-xl overflow-hidden h-[450px]'>
            {/* image container */}
            <div className='h-[40%]'>
                <img src={image} alt="Image" loading='lazy' className='w-full h-full object-contain select-none p-2' />
            </div>

            <div className='flex flex-col justify-evenly gap-2 px-4 pb-2 h-[70%]'>
                <p className='font-bold text-sm' title={title}>{title.split(" ").slice(0, 4).join(" ") + "..."}</p>
                <div className='flex items-center gap-2'>
                    <p>{rating.rate}</p>
                    <img src={star} alt="Star" loading='lazy' width={19} height={19}/>
                </div>
                <p className='text-xs' title={description}>{description.split(" ").slice(0, 6).join(" ") + "..."}</p>
                <p className='font-semibold'>${price}</p>
                {
                    isLoggedIn ? 
                    (
                        <button className={`bg-green-700 text-white rounded-xl p-2 px-3 mt-2 w-fit flex gap-2 cursor-pointer transition-all duration-200 ${isInCart ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart();
                        }}
                        >
                            <div className='flex gap-1.5 items-center'>
                                <FaShoppingCart className=''/>
                                <p className='text-sm w-fit'>{isInCart ? "Added to Cart" : "Add to Cart"}</p>
                            </div>
                        </button>
                    ) :
                    (
                        <em>Please login to add to cart</em>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default ProductCard