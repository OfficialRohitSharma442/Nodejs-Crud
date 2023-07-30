const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { defaultButtonAppearanceProvider } = require("pdf-lib");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

/* mongoDB connection */

mongoose.connect("mongodb+srv://officialrohitsharma442:3L7R80yz2Pr1BiSz@cluster0.u5xcy5k.mongodb.net/crud", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected with MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
/* mongoDB schema  */
const productSchema = new mongoose.Schema({
    name: String,
    description: String, // Fixed the typo here
    price: Number,
});

const Product = mongoose.model("Product", productSchema);
/* api  for create product  */
app.post("/api/v1/product/new", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating product.",
        });
    }
});

/* Api for get all  Products */
app.get("/api/v1/products", async (req, res) => {

    const products = await Product.find();
    res.status(200).json({ success: true, products });

})

app.put("/api/v1/product/:id", async (req, res) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        req.status(500).json({ success: false, message: "undable to find product" })
        return;
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false, runValidators: true })
    res.status(200).json({
        success: true,
        product
    })
})

/* delete product api */

/* app.delete("/api/v1/product/:id", async (req, res) => {
    const product = Product.findById(req.params.id);
 
    if (!product) {
        res.status(500).json({ success: false, message: "undable to find product" })

    } else {
        await product.remove();

        res.status(200).json({ success: true, message: "product is deleted successfully" });

    }

}) */

app.delete("/api/v1/product/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Unable to find product" });
        }
        await product.remove();
        return res.status(200).json({ success: true, message: "Product is deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "An error occurred while deleting the product" });
    }
});











app.listen(4500, () => {
    console.log("Server is running at https://localhost:4500");
});
