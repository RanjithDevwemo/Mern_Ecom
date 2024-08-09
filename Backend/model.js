// Import necessary modules
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Adjust the path as needed

// Route to get all orders for a specific user by user ID
app.get('/getuserorder/:id', async (req, res) => {
    try {
        // Extract userId from the request parameters
        const userId = req.params.id;

        // Fetch all orders related to the user
        const userOrders = await Order.find({ userId: userId });

        if (!userOrders.length) {
            return res.status(404).json({ success: false, message: 'No orders found for this user' });
        }

        // Respond with the orders data
        res.json({ success: true, data: userOrders });
        console.log("Successfully retrieved user orders");

    } catch (error) {
        // Log the error and respond with a status of 500
        console.error("Error retrieving user orders:", error.message);
        res.status(500).json({ success: false, error: "Error retrieving user orders" });
    }
});

module.exports = router;
