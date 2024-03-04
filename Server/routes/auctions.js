const express = require("express");
const Auctions = require("../models/acution");

const router = express.Router();

// Save Auctions
router.post("/auction/save", (req, res) => {
  let newAuction = new Auctions(req.body);

  newAuction
    .save()
    .then((savedAuction) => {
      console.log("Auction saved successfully:", savedAuction);
      return res.status(200).json({
        success: "Auction saved successfully",
        auction: savedAuction,
      });
    })
    .catch((error) => {
      console.error("Error saving Auction:", error);
      return res.status(500).json({
        error: "An error occurred while saving the Auction",
      });
    });
});

// Get all Auctions
router.get("/auctions", (req, res) => {
  Auctions.find()
    .then((auctions) => {
      if (!auctions) {
        throw new Error("No auctions found.");
      }
      res.status(200).json({
        success: true,
        existingAuctions: auctions,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: "An error occurred while fetching auctions.",
      });
    });
});

// Get auction by Auction by id
router.get("/auction/:id", (req, res) => {
  const auctionId = req.params.id;

  Auctions.findById(auctionId)
    .then((auction) => {
      if (!auction) {
        throw new Error("Auction not found.");
      }
      res.status(200).json({
        success: true,
        auction: auction,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        error: "An error occurred while fetching the auction.",
      });
    });
});

// Update a Auction
router.put("/auction/update/:id", (req, res) => {
  Auctions.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(() => {
      return res.status(200).json({
        success: "Updated Successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
});

// Delete a Auction
router.delete("/auction/delete/:id", (req, res) => {
  Auctions.findByIdAndDelete(req.params.id)
    .then((deletedAuction) => {
      if (!deletedAuction) {
        return res.status(404).json({
          message: "Auction not found",
        });
      }
      return res.status(200).json({
        message: "Delete Successful",
        deletedAuction,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Delete unsuccessful",
        error: err,
      });
    });
});

module.exports = router;
