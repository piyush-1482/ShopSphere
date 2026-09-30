import { useEffect, useState } from "react";
import api from "../services/api";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");

                setProducts(response.data.products);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to fetch products"
                );
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = async (productId) => {
        setMessage("");
        setError("");

        try {
            await api.post("/cart", {
                productId,
                quantity: 1
            });

            setMessage("Product added to cart!");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );
        }
    };

    return (
        <div>
            <h1>ShopSphere Products</h1>

            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                products.map((product) => (
                    <div key={product._id}>
                        <h2>{product.name}</h2>

                        <p>{product.description}</p>

                        <p>
                            Price: ₹{product.price}
                        </p>

                        <p>
                            Category: {product.category}
                        </p>

                        <p>
                            Stock: {product.stock}
                        </p>

                        <button
                            onClick={() =>
                                handleAddToCart(product._id)
                            }
                        >
                            Add to Cart
                        </button>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
};

export default Products;