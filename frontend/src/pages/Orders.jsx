import { useEffect, useState } from "react";
import api from "../services/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data.orders);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch orders"
            );
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>My Orders</h1>

            {error && <p>{error}</p>}

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id}>
                        <h2>
                            Order ID: {order._id}
                        </h2>

                        <p>
                            Status: {order.status}
                        </p>

                        {order.items.map((item) => (
                            <div key={item.product?._id || item.name}>
                                <p>
                                    {item.name} × {item.quantity}
                                </p>

                                <p>
                                    Price: ₹{item.price}
                                </p>
                            </div>
                        ))}

                        <h3>
                            Total: ₹{order.totalAmount}
                        </h3>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;