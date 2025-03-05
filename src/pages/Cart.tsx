import React from 'react'
import Navbar from '../components/Navbar'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { useNavigate } from 'react-router'
import CartProduct from '../components/CartProduct'
import { setCartItem } from '../redux/slices/cartSlice'

const Cart: React.FC = () => {
  const { emailId, isLoggedIn } = useAppSelector(state => state.auth);
  const cartState = useAppSelector(state => state.cart.carts[emailId] || []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const totalAmount = (): number => {
    return cartState.reduce((acc, curr) => acc + Number(curr.price), 0);
  };

  const gstAmount = totalAmount() * 0.18;
  const totalWithGST = totalAmount() + gstAmount;

  const removeProduct = (_id: number): void => {
    const updatedCart = cartState.filter((pro) => pro.id !== _id);
    dispatch(setCartItem({
      userEmail: emailId,
      cartItems: updatedCart
    }));
  };

  return (
    <div className="max-w-[90%] mx-auto mt-5">
      <Navbar />

      {cartState.length > 0 ? (
        <div className='mt-6 w-full flex flex-col md:flex-row gap-6'>
          {/* Product List */}
          <div className='flex flex-col gap-4 w-full md:max-w-[60%]'>
            {cartState.map((item) => (
              <CartProduct
                key={item.id}
                _id={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.image}
                removeProduct={removeProduct}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className='ml-2 flex flex-col p-4 border border-gray-300 rounded-lg w-full md:w-auto h-fit'>
            <p className='text-green-700 text-xl font-bold uppercase'>
              Your Cart
              <br />
              <span className='text-5xl'>Summary</span>
            </p>

            <p className='mt-5 font-bold text-slate-700'>Total Items: {cartState.length}</p>

            <p className='font-bold mt-2'>
              Total Amount: ${totalWithGST.toFixed(2)}
            </p>

            {/* Price Break-up */}
            <div className='mt-6 border border-slate-400 rounded-md w-full flex flex-col p-2 text-sm gap-2'>
              <div className='flex justify-between'>
                <p>Base Price</p>
                <p>${totalAmount().toFixed(2)}</p>
              </div>
              <div className='flex justify-between'>
                <p>GST (18%)</p>
                <p>${gstAmount.toFixed(2)}</p>
              </div>
              <div className='flex justify-between font-bold'>
                <p>Total</p>
                <p>${totalWithGST.toFixed(2)}</p>
              </div>
            </div>

            <button className='bg-green-700 text-white font-semibold px-2 py-1.5 rounded-md mt-5 cursor-pointer hover:bg-green-600 transition-all duration-200'>
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-4 justify-center items-center h-[50vh]'>
          <p className='font-bold text-lg'>Your cart is empty!</p>
          <button
            className='bg-green-700 text-white rounded-xl px-4 py-2 transition-all duration-200 hover:bg-green-600'
            onClick={() => isLoggedIn ? navigate('/home') : navigate('/')}
          >
            Shop Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;