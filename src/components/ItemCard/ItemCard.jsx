import "./ItemCard.css";
import React from "react"

export default function ItemCard(props) {

  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData("card_id", target.id);

    // setTimeout(() => {
    //   target.style.display = "none";
    // }, 0);
  }

  const dragOver = e => {
    e.stopPropagation();
  }

  return (
    <div className="item-card"
      id={props.id}
      className={props.className}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={dragOver}

    >



      <div className="item-card-name"
      // id={props.id}
      // className={props.className}
      // draggable={props.draggable}
      // onDragStart={dragStart}
      // onDragOver={dragOver}
      >
        <div>
          <img draggable="false" src="https://i.pinimg.com/236x/62/f9/03/62f903baf2e6794b2684699b24b61eee.jpg" className="item-card-image"></img>
        </div>
        {props.children}
      </div>

    </div>
  )
}
