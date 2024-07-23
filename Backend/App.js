
const port = 4001;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/mern");

// Image Storage Setup with Multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// Serving uploaded images statically
app.use('/images', express.static('upload/images'));

// Product Schema
const Product = mongoose.model('products', {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// Add Product Endpoint
app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("Product Saved:", product);
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error adding product:", error.message);
        res.status(500).json({ success: false, error: "Failed to add product" });
    }
});

// Remove Product Endpoint
app.post("/removeproduct", async (req, res) => {
    try {
        await Product.findOneAndDelete({ _id: req.body.id });
        console.log("Product removed");
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error("Error removing product:", error.message);
        res.status(500).json({ success: false, error: "Failed to remove product" });
    }
});

// Get All Products Endpoint
app.get("/allproducts", async (req, res) => {
    try {
        let products = await Product.find({});
        res.json(products);
        console.log("All products fetched");
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// User Schema
const User = mongoose.model("Users", {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    cartData: { type: Object },
    date: { type: Date, default: Date.now }
});

// User Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        let check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "User with the same email already exists" });
        }

        let cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }

        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart
        });

        await user.save();
        console.log("User signed up:", user);
        
        const token = jwt.sign({ user: { id: user.id } }, 'secret_ecommerce');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error signing up user:", error.message);
        res.status(500).json({ success: false, error: "Failed to sign up user" });
    }
});

// User Login Endpoint
app.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const passCompare = req.body.password === user.password;
        console.log(user.password);
        if (passCompare) {
            const token = jwt.sign({ user: { id: user.id } }, 'secret_ecommerce');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, error: "Wrong Password" });
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ success: false, error: "Failed to log in" });
    }
});

// Middleware to verify JWT token
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, "secret_ecommerce");
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
}

// Add to Cart Endpoint (Requires Authentication)
app.post("/addtocart", fetchUser, async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        userData.cartData[req.body.itemId] += 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("Item added to cart");
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
});

// Remove from Cart Endpoint (Requires Authentication)
app.post("/removefromcart", fetchUser, async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        if (userData.cartData[req.body.itemId] > 0) {
            userData.cartData[req.body.itemId] -= 1;
            await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
            res.send("Item removed from cart");
        } else {
            res.status(400).json({ error: "Item count already zero, cannot remove" });
        }
    } catch (error) {
        console.error("Error removing from cart:", error.message);
        res.status(500).json({ error: "Failed to remove item from cart" });
    }
});

app.post("/getcart",fetchUser,async (req,res)=>{
    console.log("get cart sucessc");
    let userData=await User.findOne({_id:req.user.id})
    res.json(userData.cartData);
})

// Server Listening
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
