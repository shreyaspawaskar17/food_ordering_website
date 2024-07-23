const mongoose = require('mongoose');
const { Schema } = mongoose;

const AddressSchema = new Schema({
    phone: {
        type: Number,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    paymentOption: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    }
});

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    address: {
        type: [AddressSchema],
        default: null
    }
});
module.exports = mongoose.model('users', UserSchema);
