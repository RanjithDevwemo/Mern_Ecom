const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

// Define Product and Order schemas and models
const Product = mongoose.model('Product', {
    name: String,
    new_price: Number,
    stock: Number
});

const Order = mongoose.model('Order', {
    username: String,
    userId: String,
    totalProduct: Number,
    total: Number,
    date: { type: Date, default: Date.now }
});

// Endpoint to handle order creation without user authentication
app.post('/order', async (req, res) => {
    const { username, userId, cartData, totalProduct, totalAmount } = req.body;

    try {
        // Validate input
        if (!username || !userId || !cartData || !totalProduct || !totalAmount) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Create an order
        const order = new Order({
            username,
            userId,
            totalProduct,
            total: totalAmount
        });

        // Save the order
        await order.save();

        // Update stock for each product in the cart
        for (const itemId in cartData) {
            const quantity = cartData[itemId];
            if (quantity > 0) {
                const product = await Product.findById(itemId);
                if (product) {
                    if (product.stock < quantity) {
                        return res.status(400).json({ error: `Insufficient stock for product ID ${itemId}` });
                    }
                    product.stock -= quantity;
                    await product.save();
                } else {
                    return res.status(404).json({ error: `Product with ID ${itemId} not found` });
                }
            }
        }

        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ error: "Failed to place order" });
    }
});

// Dummy server setup
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
