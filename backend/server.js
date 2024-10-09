const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Customer = require("./models/Customer");
const Product = require("./models/Product");
const Billing = require("./models/Billing");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://manishsyal77:manishsyal77@cluster0.4pyut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting DB", err));

app.get("/", (req, res) => {
  res.send("Billing Software API");
});

// Route to add a customer
app.post("/api/customers", async (req, res) => {
  const { name, gender, contact, email } = req.body;
  try {
    const newCustomer = new Customer({
      name,
      gender,
      contact,
      email,
    });

    await newCustomer.save();
    res
      .status(201)
      .json({ message: "Customer added successfully", customer: newCustomer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add customer" });
  }
});

// Route to get all customers
app.get("/api/customers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get customers" });
  }
});

// Add a product
app.post("/api/products", async (req, res) => {
  const { name, price, quantity, brand, supplier, oldStock, category } =
    req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      quantity,
      brand,
      supplier,
      oldStock,
      category,
    });

    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// Create a new billing
app.post("/api/billing", async (req, res) => {
  const { customerId, products } = req.body;

  try {
    // Validate customer
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(400).json({ error: "Customer not found" });
    }

    let totalAmount = 0;

    // Validate products and calculate total amount
    for (let item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }
      totalAmount += product.price * item.quantity;
    }

    const newBilling = new Billing({
      customer: customerId,
      products,
      totalAmount,
    });

    await newBilling.save();
    res
      .status(201)
      .json({ message: "Billing added successfully", billing: newBilling });
  } catch (error) {
    console.error("Error creating billing:", error);
    res.status(500).json({ error: "Failed to create billing" });
  }
});

// Route to create a new bill
app.post("/api/billing", async (req, res) => {
  const { customer, products, totalAmount } = req.body;
  try {
    const newBill = new Billing({
      customer,
      products,
      totalAmount,
    });

    await newBill.save();
    res
      .status(201)
      .json({ message: "Billing added successfully", bill: newBill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add billing" });
  }
});

// Route to get all bills
app.get("/api/billing", async (req, res) => {
  try {
    const bills = await Billing.find()
      .populate("customer")
      .populate("products.product");
    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get billing" });
  }
});

// Route to delete a bill
app.delete("/api/billing/:id", async (req, res) => {
  try {
    const bill = await Billing.findByIdAndDelete(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete bill" });
  }
});

// Route to get total sales and revenue
app.get("/api/sales", async (req, res) => {
  try {
    const bills = await Billing.find();
    const totalSales = bills.length; // Count of all bills
    const totalRevenue = bills.reduce(
      (total, bill) => total + bill.totalAmount,
      0
    ); // Sum of all total amounts

    res.status(200).json({ totalSales, totalRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sales data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
