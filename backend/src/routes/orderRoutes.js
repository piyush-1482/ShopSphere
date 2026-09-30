const express = require("express");

const {
    placeOrder,
    getMyOrders
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All order routes require authentication
router.use(protect);

// Place a new order
router.post("/", placeOrder);

// Get logged-in user's orders
router.get("/", getMyOrders);

module.exports = router;