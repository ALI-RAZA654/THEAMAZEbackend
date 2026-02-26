const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderId: { type: String, required: true, unique: true },
    customerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, default: '' }, // Optional
        country: { type: String, required: true }
    },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            selectedColor: { type: String },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: false,
                ref: 'Product'
            }
        }
    ],
    paymentMethod: { type: String, required: true }, // COD / EasyPaisa / JazzCash
    totalAmount: { type: Number, required: true, default: 0.0 },
    status: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
