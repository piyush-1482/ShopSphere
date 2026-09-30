import { useEffect, useState } from "react";
import api from "../services/api";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const fetchCart = async () => {
        try {
            const response = await api.get("/cart");

            setCart(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch cart"
            );
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId, quantity) => {
        try {
            const response = await api.put(
                `/cart/${productId}`,
                { quantity }
            );

            setCart(response.data.cart);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update cart"
            );
        }
    };

    const removeItem = async (productId) => {
        try {
            const response = await api.delete(
                `/cart/${productId}`
            );

            setCart(response.data.cart);
            setMessage("Product removed from cart");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to remove product"
            );
        }
    };

    const placeOrder = async () => {
    try {
        setError("");
        setMessage("");

        const response = await api.post("/orders");

        setCart({ items: [] });

        setMessage(
            `Order placed successfully! Order ID: ${response.data.order._id}`
        );
    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Failed to place order"
        );
    }
};

    const calculateTotal = () => {
        if (!cart?.items) {
            return 0;
        }

        return cart.items.reduce(
            (total, item) =>
                total +
                item.product.price * item.quantity,
            0
        );
    };

    if (!cart) {
        return <p>Loading cart...</p>;
    }

    return (
        <div>
            <h1>Shopping Cart</h1>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            {cart.items.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.items.map((item) => (
                        <div key={item.product._id}>
                            <h2>{item.product.name}</h2>

                            <p>
                                Price: ₹{item.product.price}
                            </p>

                            <p>
                                Quantity: {item.quantity}
                            </p>

                            <button
                                onClick={() =>
                                    updateQuantity(
                                        item.product._id,
                                        item.quantity - 1
                                    )
                                }
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>

                            <button
                                onClick={() =>
                                    updateQuantity(
                                        item.product._id,
                                        item.quantity + 1
                                    )
                                }
                            >
                                +
                            </button>

                            <button
                                onClick={() =>
                                    removeItem(
                                        item.product._id
                                    )
                                }
                            >
                                Remove
                            </button>

                            <hr />
                        </div>
                    ))}

                    <h2>
                        Total: ₹{calculateTotal()}
                    </h2>
                    <button onClick={placeOrder}>
                        Place Order
                    </button>
                </>
            )}
        </div>
    );
};

export default Cart;