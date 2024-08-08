
const port = 4001;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt=require("bcrypt");
const { type } = require('os');
// const { type } = require('os');
// Middleware

app.use(cors());
app.use(express.json());


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

app.post('/upload',upload.single('product'), async(req,res)=>{
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
  });

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
    stock:{type:Number,require:true},
});

// Add Product Endpoint
app.post('/addproduct:id', async (req, res) => {

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
            stock:req.body.stock,
        });

// console.log(quantity);


       
        // console.log("Product Saved:", product);
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
    const { itemId, quantity } = req.body; // Expecting itemId and quantity in the request body
// console.log(itemId,quantity);
    try {
        // Find the user
        let userData = await User.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update cart data
        if (!userData.cartData[itemId]) {
            userData.cartData[itemId] = 0;
        }
        userData.cartData[itemId] += quantity;

        // Save updated user data
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });

        res.json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
});




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


// Admin Schema
const Admin = mongoose.model("Admin", {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

// Admin Signup Endpoint
app.post('/admin/signup', async (req, res) => {
    try {
        let check = await Admin.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, error: "Admin with the same email already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password

        const admin = new Admin({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword // Store hashed password
        });

        await admin.save();
        console.log("Admin signed up:", admin);
        
        const token = jwt.sign({ admin: { id: admin.id } }, 'secret_admin');
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error signing up admin:", error.message);
        res.status(500).json({ success: false, error: "Failed to sign up admin" });
    }
});

// Admin Login Endpoint
app.post('/admin/login', async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(404).json({ success: false, error: "Admin not found" });
        }

        const passCompare = await bcrypt.compare(req.body.password, admin.password); // Compare hashed password
        if (passCompare) {
            const token = jwt.sign({ admin: { id: admin.id } }, 'secret_admin');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, error: "Wrong Password" });
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        res.status(500).json({ success: false, error: "Failed to log in" });
    }
});

// Middleware to verify Admin JWT token
const fetchAdmin = async (req, res, next) => {
    const token = req.header('admin-token');
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, 'secret_admin');
        req.admin = data.admin;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
}


  
// Order Schema


const Order= mongoose.model("order",{

    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      userName:{
       type:String,
       required:true
      },
      totalproduct:{type:Number,require:true},
      total:{type:Number,required:true},
      orderProducts:{type:Object,default:{}},
      oederProductName:{type:Object,default:{}},
      date:{type:Date,default:Date.now}
})



// Endpoint to handle order creation without user authentication


app.post('/order', async (req, res) => {
    const { userId, cartData, totalProduct, totalAmount } = req.body;

    try {
        // Validate input
        if (!userId || !cartData || !totalProduct || !totalAmount) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const UId= await User.findById(userId);
        
        for(const productId in cartData){

           const proName=await Product.findOne({id:productId});

            console.log(proName.name);
            
        }



        // Create an order
        const order = new Order({
            userId,
            userName:UId.name,
            totalProduct,
            orderProducts:cartData,
            total: totalAmount
        });
        // console.log(cartData);


        // Save the order
        await order.save();

        // Update stock for each product in the cart
        for (const itemId in cartData) {
            const quantity = cartData[itemId];
            if (quantity > 0) {
                const product = await Product.findOne({ id: itemId });
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

        // Clear the user's cart data
        await User.findOneAndUpdate(
            { _id: userId },
            { $set: { cartData: {} } }          //The $set operator used for replace the value 

        );

        res.json({ success: true, message: "Order placed successfully and cart cleared" });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ error: "Failed to place order" });
    }
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});









