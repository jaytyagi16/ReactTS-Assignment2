import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import ProductDetails from "./pages/ProductDetails"

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
      </Routes>
    </div>
  )
}

export default App