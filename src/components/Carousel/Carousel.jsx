import "./Carousel.css";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import itemsApi from "../../utils/items-api";

export default function Carousel( {user} ) {
  const userId = user.state._id;
  const [itemData, setItemData] = useState([]);
  
  const [current, setCurrent] = useState(0);
  const length = itemData.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const getItems = async () => {
    const items = await itemsApi.show(userId);
    setItemData(items.item);
    console.log("TESTINGG ---->", itemData);
  }

  useEffect(() => {
    getItems();
  }, [])

  return (

    <div className="col-2-pics">
      {itemData.map((item, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <>
                <div id="title">{item.title}</div>
                <img id="image" alt="test" src={`/${item.image}`}></img>
              </>
            )}
          </div>
        );
      })}
      <div className="img-slider-arrows">
        <FaArrowAltCircleLeft className="right-arr" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arr" onClick={nextSlide} />
      </div>
    </div>
  );
}