const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
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
/* api  */
app.post("/api/v1/product/new", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json({
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

app.listen(4500, () => {
    console.log("Server is running at https://localhost:4500");
});
