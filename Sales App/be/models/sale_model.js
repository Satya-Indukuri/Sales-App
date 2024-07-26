const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    }
});

module.exports = mongoose.model("saleModel", saleSchema);