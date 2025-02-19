import React from 'react'
import shoppingCartIcon from "../assets/shopping-cart.png"
import star from "../assets/star.png"
import { Product } from '../types/Product'

interface ProductCardProps extends Product{
    isLoggedIn?: boolean;
    addToCart: () => void;
    isInCart: boolean;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const {image, name, description, star_rating, price, isLoggedIn = false, addToCart, isInCart} = props;
  return (
    <div>
        <div className='flex flex-col gap-2 border rounded-xl overflow-hidden'>
            {/* image container */}
            <div className='w-full border-b overflow-hidden'>
                <img src={image} alt="Image" loading='lazy' className='w-full h-fit object-cover' />
            </div>

            <div className='flex flex-col gap-2 px-4 pb-2'>
                <p className='font-bold'>{name}</p>
                <div className='flex items-center gap-2'>
                    <p>{star_rating}</p>
                    <img src={star} alt="Star" loading='lazy' width={19} height={19}/>
                </div>
                <p className='text-sm'>{description}</p>
                <p className='font-semibold'>Rs. {price}</p>
                {
                    isLoggedIn ? 
                    (
                        <button className={`bg-green-700 text-white rounded-xl p-2 px-3 mt-2 w-fit flex gap-2 cursor-pointer transition-all duration-200 ${isInCart ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}
                        onClick={addToCart}
                        >
                            <img src={shoppingCartIcon} alt="CartIcon" width={20} height={19} loading='lazy' />
                            <p>{isInCart ? "Added to Cart" : "Add to Cart"}</p>
                        </button>
                    ) :
                    (
                        <p>Please login to add to cart</p>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default ProductCard