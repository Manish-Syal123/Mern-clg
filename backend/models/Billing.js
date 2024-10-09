const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  billingDate: {
    type: Date,
    default: Date.now,
  },
});

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;
