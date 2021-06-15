import React, { useState } from "react";
import "./Reply.css";

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
      <div className="Reply-header" onClick={handleHidden}>
        <h3 className="Reply-h3">
          {props.reply.author.name} offers {props.reply.itemsOffered.length} items
        </h3>
        <span id="Reply-icon">{icon}</span>
      </div>

      <div className={`Reply-body ${hidden}`}>
        <div className="Reply-page-row">
          {/* TODO Items will go here */}
          <img className="Reply-img" alt="reply-img" src="https://i.ebayimg.com/images/g/6~YAAOSwBrhe5-O4/s-l300.jpg"></img>
        </div>
        <div className="Reply-page-row">
          <p id="Reply-p">{props.reply.text}</p>
        </div>
      </div>
    </>
  );
}
