const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  auctionId: {
    type: Schema.Types.ObjectId,
    ref: "Auction",
  },
  auctioneerId: {
    type: Schema.Types.ObjectId,
    ref: "Auctioneer",
  },
  bidderId: {
    type: Schema.Types.ObjectId,
    ref: "Bidder",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  bidPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Bids", bidSchema);
