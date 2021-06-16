import React, { useState } from "react";
import { FaHandshake } from "react-icons/fa";
import "./Reply.css";

export default function Reply(props) {
  const [hidden, setHidden] = useState("");
  const [icon, setIcon] = useState("+");

  const handleHidden = () => {
    if (hidden === "reply-hidden") setHidden("");
    if (hidden === "") setHidden("reply-hidden");
    if (icon === "+") setIcon("-");
    if (icon === "-") setIcon("+");
  };

  console.log(props);
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
          {props.reply.itemsOffered.map((item) =>
          (
            <div className="Reply-img-container">
              <img className="Reply-img" alt="reply-img" src={`/${item.image}`}></img>
              <p className="Reply-item-title">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="Reply-page-row-twt">
          <p id="Reply-p">{props.reply.text}</p>
        </div>
        <div className="Reply-page-col">
          <FaHandshake id="Reply-deal" />
          <div className="Reply-txt">Make Deal</div>
        </div>
      </div>
    </>
  );
}
