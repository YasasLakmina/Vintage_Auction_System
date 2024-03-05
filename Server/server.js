const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package

const app = express();

// Import routes
const auctionRoutes = require("./routes/auctions");

// App middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Route middleware
app.use(auctionRoutes);

const PORT = 3000;
const DB_URL =
  "mongodb+srv://yasas:yasa1234@mernapp.35sagah.mongodb.net/auction?retryWrites=true&w=majority&appName=MernApp";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Connection error ", err);
  });

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
