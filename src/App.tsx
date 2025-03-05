import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import { ToastContainer } from "react-toastify"

const App = () => {
  return (
    <div>      
      <Routes>
        <Route
          path="/home"
          element={<Home/>}
        />

        <Route
          path="/"
          element={<LoginPage/>}
        />

        <Route
          path="/products/:productId"
          element={<ProductDetails/>}
        />

        <Route
          path="/cart"
          element={<Cart/>}
        />
      </Routes>

      <ToastContainer/>
    </div>
  )
}

export default App