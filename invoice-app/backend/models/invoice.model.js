const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema ({
    username: { type: String, required: true },
    description: {type: String, required: true },
    date: {type: Date, required: true },
    amount: {type: Number, required: true },
    balancedue: {type: Number, required: true },
    customerName: {type: String, required: true },
    email: {type: String, required: true },
    address: {type: String, required: true },
    phone: {type: Number, required: true },
    status: {type: String, required: true },
    invoiceNum: {type: Number, required: true }
}, {
    timestamps: true,
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice; 