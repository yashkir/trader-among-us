import React, { useState } from 'react'
import PageTitle from "../../components/PageTitle/PageTitle"
import Reply from "../../components/Reply/Reply"
import "./PostIdPage.css"
import Bid from "../../components/Bid/Bid"


export default function PostIdPage() {
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
      <div>
        <PageTitle titleOne={"VIEW"} titleTwo={"POST"} />
      </div>
      <div class='PostIdPage post-page-column'>
        <div class="PostIdPage post-page-row">
          <div className="post-title">OLD BIKE FROM MY GRANDMA</div>
        </div>
        <div class="PostIdPage post-page-row">
          <p id="form-p-pink">Posted On (someDate)</p>
        </div>
        <div class="PostIdPage post-page-row">
          <img id="post-img" src="https://i.stack.imgur.com/BOSno.jpg"></img>
        </div>
        <div class="PostIdPage post-page-row">
          <p className="flex-p">My grandmas bike is the best guys. THE BEST EVER!!</p>
        </div>
        <div class="PostIdPage post-page-row">
          <Bid />
        </div>
      </div>
      <div class='PostIdPage post-page-column'>
        <div className="Post-post-title">(POST.TITLE) CURRENTLY HAS (.LENGTH) BIDS</div>
        <Reply />
        <Reply />
        <Reply />
        <Reply />
      </div>
    </>
  )
}
