import React from "react";
import {AiFillDelete} from "react-icons/ai";
import "./DeleteButton.css";

export default function DeleteButton({handleDelete}) {

  return (
    <div className="delete-container" >
      <AiFillDelete onClick={handleDelete} className="delete-btn"/>
    </div>
  );
}
