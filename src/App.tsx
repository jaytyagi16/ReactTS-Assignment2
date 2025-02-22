import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"

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
      </Routes>
    </div>
  )
}

export default App