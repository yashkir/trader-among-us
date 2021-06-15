import React, {useState} from "react";
import "./PostBid.css";

export default function PostBid() {

  const [hidden, setHidden] = useState("");
  const [icon, setIcon] = useState("+");

  const handleHidden = () => {
    if (hidden === "hidden") setHidden("");
    if (hidden === "") setHidden("hidden");
    if (icon === "+") setIcon("-");
    if (icon === "-") setIcon("+");
  };

  return (
    <div className="bid-container">
      <div className="bid-header" onClick={handleHidden}>
        <h3>Make a Bid</h3>
        <span>{icon}</span>
      </div>

      <div className={`bid-body ${hidden}`}>
        <div className="post-bid-items">
          <h4>Description</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum temporibus, eaque blanditiis ut commodi odit placeat quae soluta amet magni natus ex quia exercitationem praesentium deleniti quo cum architecto aperiam ullam sequi et. Eius, laudantium earum facere ad amet harum laborum eveniet, odit similique quo quae, culpa quibusdam ipsa sunt.</p>
        </div>
        <div className="post-image">
          <img src="https://i.imgur.com/aPRlorH.jpeg"></img>
        </div>
      </div>
    </div>
  );
}
