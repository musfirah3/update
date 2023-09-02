const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    brandName: {
        type: String,
        required: true,
        unique: true,
    }
})
module.exports = mongoose.model('Brand', brandSchema)