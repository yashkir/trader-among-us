import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css"

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <Carousel autoPlay showThumbs={false} infiniteLoop={true} interval={4000} showStatus={false} dynamicHeight={true} useKeyboardArrows={true}>
    <div>
      <img alt="" src="https://wl-brightside.cf.tsp.li/resize/728x/jpg/181/4fb/2a0b6e52e29e3ba58697034db7.jpg" />
      {/* <p className="legend">Item 1</p> -- if you want to use item name inside image*/}
    </div>
    <div>
      <img alt="" src="https://i.stack.imgur.com/BOSno.jpg" />
    </div>
    <div>
      <img alt="" src="https://cdn.greatlifepublishing.net/wp-content/uploads/sites/4/2015/10/23150611/coffee-grinder-715170_960_720.jpg" />
    </div>
  </Carousel>
  )
};

