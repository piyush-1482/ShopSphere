const express = require("express");

const {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All cart routes require authentication
router.use(protect);

// Get user's cart
router.get("/", getCart);

// Add product to cart
router.post("/", addToCart);

// Update product quantity
router.put("/:productId", updateCartItem);

// Remove product from cart
router.delete("/:productId", removeFromCart);

module.exports = router;