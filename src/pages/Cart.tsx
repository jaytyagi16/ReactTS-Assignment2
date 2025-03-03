import React from 'react'
import Navbar from '../components/Navbar'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useNavigate } from 'react-router'
import CartProduct from '../components/CartProduct'
import { setCartItem } from '../redux/slices/cartSlice'

const Cart: React.FC = () => {
  const {emailId, isLoggedIn} = useAppSelector(state => state.auth)
  const cartState = useAppSelector(state => state.cart.carts[emailId] || []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log(cartState)

  const totalAmount = (): number => {
    return cartState.reduce((acc, curr) => acc + curr.price ,0)
  }

  const removeProduct = (_id: number): void => {
    const updatedCart = cartState.filter((pro) => {
      return pro.id !== _id
    });
    dispatch(setCartItem({
      userEmail: emailId,
      cartItems: updatedCart
    }))
  }

  return (
    <div className="max-w-[90%] mx-auto mt-5">
      <Navbar/>

      {
        cartState.length > 0 ? (
          <div className='mt-6 w-full flex gap-6'>
            {/* product list */}
            <div className='flex flex-col gap-4 max-w-[60%]'>
              {
                cartState.map((item) => (
                  <div 
                    key={item.id}
                  >
                    <CartProduct
                      _id={item.id}
                      title={item.title}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                      removeProduct={removeProduct}
                    />
                  </div>
                ))
              }
            </div>

            {/* cart amount */}
            <div className='ml-2 flex flex-col'>
              <p className='text-green-700 text-xl font-bold uppercase'>
                Your Cart
                <br />
                <span className='text-5xl'>Summary</span>
              </p>

              <p className='mt-5 font-bold text-slate-700'>Total Item: {cartState.length}</p>

              <p className='font-bold mt-20'>Total Amount <span className='text-xs'>{"(with 18% GST)"}</span> : {`$${(totalAmount() * 1.18).toFixed(2)}`}</p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-4 justify-center items-center mt-36'>
            <p className='font-bold'>Cart is empty!</p>
            <button
              className='bg-green-700 text-white rounded-xl p-2 px-3 mt-2 w-fit flex gap-2 cursor-pointer transition-all duration-200 hover:bg-green-600'
              onClick={() => isLoggedIn ? navigate('/home') : navigate('/')}
            >
              Shop Now
            </button>
          </div>
        )
      }
    </div>
  )
}

export default Cart