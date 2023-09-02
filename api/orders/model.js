const { Schema, model } = require('mongoose')

const OrdersSchema = new Schema({
    items: {
        type: Array,
        required: true
    },
    totalBill: {
        type: Number,
        required: true
    },
    customerAddress: {

        type: String,
        required: true
    },
    customerContact: {
        type: Number,
        required: true
    },
    customerName: {

        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        default: "Pending"
    },
    Message: {
        type: String,
        default: "Your order is currently being processed with care. We'll send you a confirmation email once it's on its way to you."
    },
    order_at: {
        type: Date,
        default: Date.now
    }
})


const Orders = model('order', OrdersSchema)
module.exports = Orders