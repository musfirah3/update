const app = require('express')
const { addProducts, getProducts,ProductByCategory, ProductByBrand, deleteProduct, ProductbyId } = require('./controller')
const { updateBrand } = require('../brands/controller')
const router = app.Router()

// add products
router.post('/product', addProducts)

//allproduct
router.get('/get-all-products',getProducts)

//get product by Category
router.get('/product-by-category/:category', ProductByCategory)

//get product by brand
router.get('/productby-brand/:brand', ProductByBrand)

//Delete product
router.delete('/product/:_id', deleteProduct)

//update Product
router.put('/product/:_id', updateBrand)

//By id
router.get('/product/:_id',ProductbyId)
module.exports = router