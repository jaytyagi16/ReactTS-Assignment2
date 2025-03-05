import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import { ToastContainer } from "react-toastify"
import ErrorPage from "./pages/ErrorPage"

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

        <Route
          path="*"
          element={<ErrorPage/>}
        />
      </Routes>

      <ToastContainer/>
    </div>
  )
}

export default App