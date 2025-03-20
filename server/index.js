const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const JSONdb = require("simple-json-db");
const app = express();
const port = 5000;

// Initialize JSON database
const db = new JSONdb("./database.json");

// Mock initial data for slots
if (!db.has("slots")) {
  db.set("slots", [
    { id: 1, stylist: "John Doe", service: "haircut", date: "2023-12-01", time: "10:00 AM" },
    { id: 2, stylist: "Jane Smith", service: "colouring", date: "2023-12-01", time: "11:00 AM" },
  ]);
}

app.use(cors());
app.use(bodyParser.json());

// API to get available slots
app.get("/api/slots", (req, res) => {
  const { service, stylist, date, time } = req.query;
  const slots = db.get("slots");

  // Filter slots based on query parameters
  const filteredSlots = slots.filter((slot) => {
    return (
      (!service || slot.service === service) &&
      (!stylist || slot.stylist === stylist) &&
      (!date || slot.date === date) &&
      (!time || slot.time === time)
    );
  });

  res.json(filteredSlots);
});

// API to handle payment
app.post("/api/payment", (req, res) => {
  const { cardNumber, expiryDate, cvv } = req.body;

  // Mock payment validation
  if (cardNumber && expiryDate && cvv) {
    // Simulate a successful payment
    if (cardNumber === "4242424242424242") {
      res.json({ success: true, message: "Payment successful!" });
    } else {
      // Simulate a payment error
      res.status(400).json({ success: false, message: "Payment failed: Invalid card number" });
    }
  } else {
    res.status(400).json({ success: false, message: "Payment failed: Missing payment details" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});