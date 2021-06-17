import React, { useState, useEffect } from "react";
import { FaHandshake } from "react-icons/fa";
import postsApi from "../../utils/posts-api";
import Conversation from "../Conversation/Conversation";

export default function Deal({ user, post, reply }) {
  const [deal, setDeal] = useState(null);

  useEffect(() => {
    loadDeal();
  }, []);

  function loadDeal () {
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
  }

  async function confirmDealToggle() {
    await postsApi.confirmDealToggle(post._id, reply._id);
    loadDeal();
  }

  return (
    <div className="Deal">
      {deal ?
        <div>
          {deal.posterHasConfirmed && deal.replierHasConfirmed
            ? <p>DEAL IS DONE</p>
            :
            <>
              <p>Deal in progress...</p>
              <span className="Deal-poster">
                {post.author.name}
                {deal.posterHasConfirmed
                  ? <span> has <b>confirmed</b></span>
                  : <span> has <b>not</b> confirmed</span>
                }
              </span>
              <FaHandshake id="Reply-deal" />
              <span className="Deal-replier">
                {reply.author.name}
                {deal.replierHasConfirmed
                  ? <span> has <b>confirmed</b></span>
                  : <span> has <b>not</b> confirmed</span>
                }
              </span>
              <br />
              {user._id === post.author._id
                ? <button onClick={handleCancelDeal}>Cancel</button>
                : null}
              <button onClick={confirmDealToggle}>Confirm</button>
            </>
          }
          {user._id === post.author._id || user._id === reply.author._id
            ? <Conversation post={post} reply={reply} deal={deal}/>
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
