const Product = require('../models/Products')

const getProduct = async (req, res) => {
    try {
        const { category, search } = req.query
        let query = {}

        if (category) query.category = category
        if (search) query.title = { $regex: search, $options: 'i' }

        const products = await Product.find(query).populate('category', 'name')
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug }).populate('category')
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({ message: 'Product not found' })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const { name, description, brand, category, images, variants } = req.body

        const slug = name.toLowerCase().split(' ').join('-') + '-' + Date.now()

        const product = new Product({
            name, slug, description, brand, category, images, variants
        })

        const createdProduct = await product.save()
        res.status(201).json(createdProduct)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getProduct,
    getProductBySlug,
    createProduct
}