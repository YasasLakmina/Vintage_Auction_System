import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // State to store the fetched auctions
  const [auctions, setAuctions] = useState([]);

  // Function to fetch all auctions
  const fetchAllAuctions = () => {
    axios
      .get("http://localhost:3000/auctions")
      .then((response) => {
        setAuctions(response.data.existingAuctions);
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
      });
  };

  // Load all auctions when the component mounts
  useEffect(() => {
    fetchAllAuctions();
  }, []);

  return (
    <div className="App">
      <h1>All Auctions</h1>
      <div className="auction-list">
        {auctions.map((auction: any) => (
          <div key={auction._id} className="auction">
            <h2>{auction.auctionTitle}</h2>
            <p>{auction.auctionDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
