import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

import { useAuth } from "./context/AuthContext";

function App() {
    const { token, logout } = useAuth();

    return (
        <BrowserRouter>
            <nav>
                <Link to="/products">
                    Products
                </Link>{" "}

                {token && (
                    <>
                        <Link to="/cart">
                            Cart
                        </Link>{" "}

                        <Link to="/orders">
                            Orders
                        </Link>{" "}
                    </>
                )}

                {!token && (
                    <>
                        <Link to="/login">
                            Login
                        </Link>{" "}

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

                {token && (
                    <button onClick={logout}>
                        Logout
                    </button>
                )}
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={<Products />}
                />

                <Route
                    path="/products"
                    element={<Products />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/orders"
                    element={<Orders />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;