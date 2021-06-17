import "./Carousel.css";
import React, { useState, useEffect } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import itemsApi from "../../utils/items-api";

export default function Carousel({ user, post }) {
  let userId;
  if(user){
    userId = user._id;
  }
  const [itemData, setItemData] = useState([]);

  const [current, setCurrent] = useState(0);
  let postLength;
  const length = itemData.length;
  if(post) postLength = post.itemsOffered.length;

  const nextSlide = () => {
    if(user) setCurrent(current === length - 1 ? 0 : current + 1);
    if(post) setCurrent(current === postLength - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if(user) setCurrent(current === 0 ? length - 1 : current - 1);
    if(post) setCurrent(current === 0 ? postLength - 1 : current - 1);
  };

  const getItems = async () => {
    if(user) {
    const items = await itemsApi.show(userId);
    setItemData(items.item);
    }
  }

  useEffect(() => {
    if(user) getItems();
  }, [])

  return (

    <div className="col-2-pics">
      {user ? 
        <>
          {itemData.map((item, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <>
                  <div id="Carousel-title">{item.title}</div>
                  <img id="image" alt="test" src={`/${item.image}`}></img>  
                </>
              )}
            </div>
            );
          })}
        </> 
        :
        <>
        {post.itemsOffered.length ? post.itemsOffered.map((item, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && (
                <>
                  <div id="Carousel-title">{item.title}</div>
                  <img id="image" alt="test" src={`/${item.image}`}></img>     
                </>
              )}
            </div>
            );
          })
        : null }

        </>
      }
        



      <div className="img-slider-arrows">
        <FaArrowAltCircleLeft className="right-arr" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arr" onClick={nextSlide} />
      </div>
    </div>

    );
  }
 



// {itemData.map((item, index) => {
//   return (
//     <div
//       className={index === current ? "slide active" : "slide"}
//       key={index}
//     >
//       {index === current && (
//         <>
//           <div id="Carousel-title">{item.title}</div>
//           <img id="image" alt="test" src={`/${item.image}`}></img>
//           <div id="Carousel-txt">{item.description}</div>        
//         </>
//       )}
//     </div>
//   );
// })}