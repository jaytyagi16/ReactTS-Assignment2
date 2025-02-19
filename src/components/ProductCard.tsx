import React from 'react'
import shoppingCartIcon from "../assets/shopping-cart.png"
import star from "../assets/star.png"

interface ProductCardProps{
    _id: number;
    image: string;
    name: string;
    description: string;
    star_rating: number;
    price: number;
    isLoggedIn?: boolean
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
    const {_id, image, name, description, star_rating, price, isLoggedIn = false} = props;
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
                        <div className='bg-green-700 text-white rounded-xl p-2 px-3 mt-2 w-fit flex gap-2 cursor-pointer hover:bg-green-600 transition-all duration-200'>
                            <img src={shoppingCartIcon} alt="CartIcon" width={20} height={19} loading='lazy' />
                            <p>Add to cart</p>
                        </div>
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