const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Place order
const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const orderItems = [];

        let totalAmount = 0;

        for (const item of cart.items) {
            const product = item.product;

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient stock for ${product.name}`
                });
            }

            orderItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            });

            totalAmount += product.price * item.quantity;
        }

        const order = await Order.create({
            user: req.user,
            items: orderItems,
            totalAmount
        });

        // Reduce product stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );
        }

        // Clear cart
        cart.items = [];
        await cart.save();

        const populatedOrder = await Order.findById(order._id)
            .populate("items.product");

        res.status(201).json({
            message: "Order placed successfully",
            order: populatedOrder
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to place order",
            error: error.message
        });
    }
};

// Get user's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.status(200).json({
            count: orders.length,
            orders
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

module.exports = {
    placeOrder,
    getMyOrders
};