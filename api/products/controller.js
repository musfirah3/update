require('dotenv').config()
const { connect } = require('mongoose')
const mongoose = require('mongoose');
const Product = require('./model')

//add Product
const addProducts = async (req, res) => {
    const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = req.body;
    if (!title || !thumbnail || !description || !price || !rating || !category || !brand || !images || !discountPercentage || !stock) {
        res.status(400).json({ message: 'Invalid Payload' })
    }
    else {
        try {
            await connect(process.env.MONGO_URL)
            const checkExisting = await Product.exists({ title })
            if (checkExisting) {
                res.status(403).json({ message: "Product Already Exists" })
            }
            else {
                await Product.create({ title, thumbnail, rating, description, price, category, brand, images, discountPercentage, stock })
                const products = await Product.find()
                res.status(201).json({
                    message: "Product Created Successfully",
                    products
                })
            }

        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }

}

//Product by category
const ProductByCategory = async (req, res) => {
    const { category } = req.params;
    if (!category) {
        res.status(403).json({
            message: "Please give category name"
        })
    }
    else {
        await connect(process.env.MONGO_URL)
        const products = await Product.find({ category })
        res.json({ products })
    }

}

//Product by Brand
const ProductByBrand = async (req, res) => {
    const { brand } = req.params;
    if (!brand) {
        res.status(403).json({
            message: "Please give brand name"
        })
    }
    else {
        await connect(process.env.MONGO_URL)
        const products = await Product.find({ brand })
        res.json({ products })
    }


}

// Delete 
const deleteProduct = async (req, res) => {
    const {_id }= req.params;

    try {
        // Find the category and delete it
        const deletedProduct = await Product.findByIdAndRemove({_id});
        console.log("deleted Product should be :", deletedProduct)

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully",
            user: deletedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Product",
            error: error.message
        });
    }
};

// Update User
const updateProduct = async (req, res) => {
    const {_id} = req.params;
    const { title, description, price, discountPercentage, stock, rating, images, thumbnail } = req.body

    try {
        console.log("Updating product with ID:", _id);
        // Find the user and update it
        const updatedProduct = await Product.findOneAndUpdate({ _id }, {
            $set: {
                title: title,
                description: description,
                price: price,
                discountPercentage: discountPercentage,
                stock: stock,
                rating: rating,
                images: images,
                thumbnail: thumbnail
            }
        },
            { new: true } // This option returns the updated document instead of the original one
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }


        res.json({
            message: "Product updated successfully",
            user: updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Product",
            error: error.message
        });
    }
}

//Product by id
const ProductbyId = async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        res.status(403).json({ message: "Please Give Product id" })
    }
    else {
        try{
        console.log("_id received:", _id); // Log the _id to verify its value
        const product = await Product.findOne({ _id });
        console.log("Product found:", product); // Log the product to verify
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Error fetching product" });
    }
    }
}

//all Products
const getProducts = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const products = await Product.find()
        res.json({ products })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
module.exports = { addProducts, getProducts, ProductByCategory, ProductByBrand, deleteProduct, updateProduct, ProductbyId }