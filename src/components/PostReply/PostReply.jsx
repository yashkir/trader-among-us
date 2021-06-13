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
        <h3>User is Offering Fountain of Youth</h3>
        <span>{icon}</span>
      </div>

      <div className={`reply-body ${hidden}`}>
        <div className="post-item-description">
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
