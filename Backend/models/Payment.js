const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: true,
    },
    cartItems: [
        {
            productId: String,
            quantity: Number,
        },
    ],
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Completed",
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
