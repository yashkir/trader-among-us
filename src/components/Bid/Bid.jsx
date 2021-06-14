import React, { useState } from "react";
import Board from "../../components/Board/Board"
import ItemCard from "../../components/ItemCard/ItemCard"
import "./Bid.css";

export default function Reply(props) {
  const [hidden, setHidden] = useState("");
  const [icon, setIcon] = useState("+");

  const handleHidden = () => {
    if (hidden === "hidden") setHidden("");
    if (hidden === "") setHidden("hidden");
    if (icon === "+") setIcon("-");
    if (icon === "-") setIcon("+");
  };

  return (
    <>
      <div className="PostIdPage post-page-row">
        <h3 onClick={handleHidden} className="post-btn">Make A Bid</h3>

      </div>

      <div className={`Bid-body-row ${hidden}`}>
        <div className="Bid-flex-row"><h5>Drag and drop to make a bid</h5></div>
        <div className="Bid-items-text">
          <div className="Bid-flex-row"><h2>Your Items</h2></div>
          <div className="Bid-flex-row"><h2>Bid Items</h2></div>
        </div>
        <div className="Bid-container">
          <Board id="board-1" className="Bid-page-column Item-board">
            <ItemCard id="card-1" className="item-card" draggable="true">
              <p className="item-card p">Item 1 Name</p>
            </ItemCard>

          </Board>

          <Board id="board-2" className="Bid-page-column Bid-board">
            <ItemCard id="card-2" className="item-card" draggable="true">
              <p className="item-card p">Item 2 Name</p>
            </ItemCard>
          </Board>
        </div>

      </div>
    </>
  );
}