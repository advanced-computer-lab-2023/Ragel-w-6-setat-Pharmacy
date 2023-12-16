// Timeline.js

import React from "react";

const Timeline = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
      <div style={{ textAlign: "center", flex: 1, color: "#00796B" }}>
        <div style={{ borderBottom: "3px solid #00796B", paddingBottom: "5px", marginBottom: "10px", fontWeight: "bold" }}>1</div>
        <div>Cart Details</div>
      </div>
      <div style={{ textAlign: "center", flex: 1, color: "#00796B" }}>
        <div style={{ borderBottom: "3px solid #00796B", paddingBottom: "5px", marginBottom: "10px", fontWeight: "bold" }}>2</div>
        <div>Delivery Address</div>
      </div>
      <div style={{ textAlign: "center", flex: 1, color: "#00796B" }}>
        <div style={{ borderBottom: "3px solid #00796B", paddingBottom: "5px", marginBottom: "10px", fontWeight: "bold" }}>3</div>
        <div>Payment Method</div>
      </div>
    </div>
  );
};

export default Timeline;
