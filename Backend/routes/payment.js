const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// POST route to process and store payment details
router.post("/", async (req, res) => {
    try {
        const { totalAmount, cartItems } = req.body;

        if (!totalAmount || cartItems.length === 0) {
            return res.status(400).json({ error: "Invalid payment data" });
        }

        // Create a new payment entry
        const newPayment = new Payment({
            totalAmount,
            cartItems,
            status: "Completed",
            paymentDate: new Date(),
        });

        // Save payment to the database
        await newPayment.save();

        res.status(201).json({ message: "Payment successful!", payment: newPayment });
    } catch (error) {
        console.error("Payment processing error:", error);
        res.status(500).json({ error: "Payment processing failed" });
    }
});

module.exports = router;
