const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('DB Connection Error:', err));

    
app.get('/api/test', (req, res) => {
  res.send({ message: "Hệ thống E-Commerce giày dép đã sẵn sàng!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));