const express = require('express')
const router = express.Router()
const { getProduct, getProductBySlug, createProduct } from '../controllers/productController.js'