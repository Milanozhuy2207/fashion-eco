const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    fullName: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'staff'], default: 'customer' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);