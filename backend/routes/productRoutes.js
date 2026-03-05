const express = require('express')
const router = express.Router()
const { getProduct, getProductBySlug, createProduct } = require('../controllers/productController.js')

router.get('/', getProduct)
router.get('/:slug', getProductBySlug)
router.post('/', createProduct)

module.exports = router

