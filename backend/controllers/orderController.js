const Order = require('../models/Orders')
const Product = require('../models/Products')

const addOrderItems = async(req,res) => {

    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {        
        return res.status(400).json({message: "There are no products in the order."})
    }

    try{
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        })

        for (const item of orderItems){
            const product = await Product.findById(item.product)
            if(product){
                const variant = product.variants.find(v => v.sku === item.variantSKU)
                if(variant){
                    if(variant.stock > item.qty)
                    {
                        variant.stock -= item.qty
                        await product.save()
                    }
                    else{
                        return res.status(400).json({message: "Out of stock."})
                    }
                }
            }
        }
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getMyOrders = async(req,res) =>{
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
}

module.exports = {
    addOrderItems,
    getMyOrders
}