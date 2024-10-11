import dotenv from "dotenv";
import { getCustomers, getCustomer, createNode } from "./database.js"; // Import đúng hàm getCustomer
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME || "localhost";

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await getCustomers();
    res.send(customers);
  } catch (err) {
    res.status(500).send("Error fetching customers");
  }
});

app.get("/customers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await getCustomer(id); // Sử dụng đúng hàm getCustomer
    if (customer) {
      res.send(customer);
    } else {
      res.status(404).send("Customer not found");
    }
  } catch (err) {
    res.status(500).send("Error fetching customer");
  }
});

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
