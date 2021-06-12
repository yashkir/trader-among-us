import React, {useState} from "react";
import "./PostReply.css";

export default function PostReply() {

  const [hidden, setHidden] = useState("");
  const [icon, setIcon] = useState("+");

  const handleHidden = () => {
    if (hidden === "hidden") setHidden("");
    if (hidden === "") setHidden("hidden");
    if (icon === "+") setIcon("-");
    if (icon === "-") setIcon("+");
  };

  return (
    <div className="reply-container">
      <div className="reply-header" onClick={handleHidden}>
        <h3>User is Offering Item Name</h3>
        <span>{icon}</span>
      </div>

      <div className={`reply-body ${hidden}`}>
        <p>Description: Lorem Ipsum</p>
      </div>
    </div>
  );
}
