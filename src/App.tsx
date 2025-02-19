import { useState } from "react"
import heartFilled from "./assets/heartFilled.png"
import heartUnfilled from "./assets/heartUnfilled.png"
import ProductCard from "./components/ProductCard"
import products from "./data/productData"
import { Product } from "./types/Product"

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    if(!cartItems.some((item) => item._id === product._id)){
      setCartItems((prevCart) => [...prevCart, product]);
    }
  }

  return (
    <div className='max-w-screen'>
      <div className='w-[90%] mx-auto mt-5'>
        {/* header */}
        <div className='flex items-center justify-evenly'>

          <div className='flex-1'></div>

          <h1 className='text-center flex-1 text-3xl font-bold'>Products</h1>

          <div className='flex items-center gap-4 flex-1 justify-end'>
            {/* cart */}
            <p>Cart: {cartItems.length}</p>

            {/* login icons */}
            {
              isLoggedIn ? 
              (
                <img src={heartFilled} alt="Avatar" loading='lazy' width={30} height={30} />
              ) :
              (
                <img src={heartUnfilled} alt="Avatar" loading='lazy' width={30} height={30} />
              )
            }
          </div>
        </div>

        {/* products */}
        <div className="w-full mt-10 grid grid-cols-3">
          {
            products.length > 0 ? 
            (
              products.map((product) => (
                <div key={product._id} className="mx-5 p-5 hover:cursor-pointer hover:scale-102 transition-all duration-300 hover:drop-shadow-xl">
                  <ProductCard
                  {...product}
                  isLoggedIn={isLoggedIn}
                  addToCart={() => addToCart(product)}
                  isInCart={cartItems.some((item) => item._id === product._id)}
                />
                </div>
              ))
            ) :
            <h2>No Products to show</h2>
          }
        </div>

      </div>

    </div>
  )
}

export default App