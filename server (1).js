// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT =  3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/vendorApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema and model
const paymentSchema = new mongoose.Schema({
    address: String,
    total: Number,
});

const Payment = mongoose.model('Payment', paymentSchema);

// API endpoint for payment submission
app.post('/api/payment', async (req, res) => {
    const { address, total } = req.body;
    try {
        const payment = new Payment({ address, total });
        await payment.save();
        res.status(201).send({ message: 'Payment recorded successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error recording payment', error });
    }
});

// Start server
app.listen(PORT, () => {
    console.log("Server is running on" +PORT);
});