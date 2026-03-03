// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config()
const app = express()
app.use(express.json())

// Đăng ký API
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/categories', categoryRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Hệ thống Backend thời trang chạy tại port ${PORT}`));