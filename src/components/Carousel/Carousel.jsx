import "./Carousel.css";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import itemsApi from "../../utils/items-api";

export default function Carousel( {user} ) {
  const userId = user.state._id;
  // const userId = location.state._id;
  // console.log(userId);
  const SliderData = [
    {
      title: "IMG-1",
      image:
        "https://i.pinimg.com/474x/f8/2e/9d/f82e9d000b829f8c81f500c51c8ffb60.jpg"
    },
    {
      title: "IMG-2",
      image:
        "https://i2.wp.com/bestlifeonline.com/wp-content/uploads/2019/03/antique-meat-press.jpg?resize=1200%2C803&ssl=1"
    },
    {
      title: "IMG-3",
      image:
        "https://images.bonanzastatic.com/afu/images/32b6/822a/7e3e_7413225783/s-l1600.jpg"
    }
  ];

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
                <div id="image" alt="test" src=""></div>
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
