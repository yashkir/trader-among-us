import React, { useState, useEffect } from "react";
import { FaHandshake } from "react-icons/fa";
import { TiCancel } from "react-icons/ti"
import { GiCheckMark } from "react-icons/gi"
import postsApi from "../../utils/posts-api";
import Conversation from "../Conversation/Conversation";
import "./Deal.css"

export default function Deal({ user, post, reply }) {
  const [deal, setDeal] = useState(null);
  const [confirmStatus, setConfirmStatus] = useState("Confirm")

  useEffect(() => {
    loadDeal();
  }, []);

  function loadDeal() {
    postsApi.getOneDeal(post._id, reply._id)
      .then(foundDeal => {
        setDeal(foundDeal);
      });
  }

  async function handleStartDeal() {
    await postsApi.startDeal(post._id, reply._id);
    setDeal(await postsApi.getOneDeal(post._id, reply._id));
  }

  async function handleCancelDeal() {
    const res = await postsApi.deleteDeal(post._id, reply._id);
    if (res.ok) {
      setDeal(null);
    }
    setConfirmStatus("Confirm")
  }

  async function confirmDealToggle() {
    await postsApi.confirmDealToggle(post._id, reply._id);
    loadDeal();
    if (confirmStatus === "Confirm") setConfirmStatus("Undo Confirm");
    if (confirmStatus === "Undo Confirm") setConfirmStatus("Confirm");
  }

  return (
    <div className="Deal">
      {deal ?
        <div className="Deal-container">
          {user._id === post.author._id
            ? <button
              className="Deal-button"
              onClick={handleCancelDeal}>
              <TiCancel className="Deal-cancel-icon" />
            </button>
            : null
          }
          {deal.posterHasConfirmed && deal.replierHasConfirmed
            ? <p className="Deal-p">DEAL IS DONE</p>
            :
            <>
              <div className="Deal-poster">
                {post.author.name}
                {deal.posterHasConfirmed
                  ? <span className="Deal-span"> has <b>confirmed</b></span>
                  : <span className="Deal-span"> has <b>not</b> confirmed</span>
                }
              </div>
              <FaHandshake id="Reply-deal-shake" />
              <span className="Deal-replier">
                {reply.author.name}
                {deal.replierHasConfirmed
                  ? <span className="Deal-span"> has <b>confirmed</b></span>
                  : <span className="Deal-span"> has <b>not</b> confirmed</span>
                }
              </span>
              <br />

              <div className="Reply-btns-div">

                <button
                  id="Deal-button-green"
                  className="Deal-button"
                  onClick={confirmDealToggle}>
                  <GiCheckMark />
                </button>
              </div>
            </>
          }
          {user._id === post.author._id || user._id === reply.author._id
            ? <Conversation post={post} reply={reply} deal={deal} />
            : null
          }

        </div>
        : user._id === post.author._id
          ?
          <div onClick={handleStartDeal}>
            <FaHandshake id="Reply-deal" />
            <div className="Reply-txt">Make Deal</div>
          </div>
          :
          null
      }
    </div>
  );
}
