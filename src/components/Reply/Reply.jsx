import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import "./Reply.css";
import Deal from "../Deal/Deal";
import { getUser } from "../../utils/users-service";
import DeleteButton from "../../components/DeleteButton/DeleteButton"
import PostsApi from "../../utils/posts-api";

export default function Reply(props) {
  const [hidden, setHidden] = useState("");
  const [icon, setIcon] = useState("+");
  const [user, setUser] = useState(getUser());
  const history = useHistory()


  useEffect(() => {
    console.log('POSTID  --->', props.post._id)
  })

  const handleHidden = () => {
    if (hidden === "reply-hidden") setHidden("");
    if (hidden === "") setHidden("reply-hidden");
    if (icon === "+") setIcon("-");
    if (icon === "-") setIcon("+");
  };

  const handleDelete = async (reply) => {
    try {
      reply = await PostsApi.deleteReply(reply)
      history.push(`/posts`)

    } catch (err) {

    }
  }

  return (
    <>
      <div className="Reply-header" onClick={handleHidden}>
        <h3 className="Reply-h3">
          {props.reply.author.name} offers {props.reply.itemsOffered.length} items
        </h3>
        <span id="Reply-icon">{icon}</span>
      </div>

      <div className={`Reply-body ${hidden}`}>
        <div className="Reply-page-row">
          {props.reply.itemsOffered.map((item, id) =>
          (
            <div className="Reply-img-container" key={id}>
              <img className="Reply-img" alt="reply-img" src={`${item.image}`}></img>
              <p className="Reply-item-title">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="Reply-page-row-twt">
          <p id="Reply-p">{props.reply.text}</p>
        </div>
        <div className="Reply-page-col">
          {user._id === props.reply.author._id ?
            <DeleteButton handleDelete={() => handleDelete(props.reply._id)} /> : null}
          <Deal user={getUser()} post={props.post} reply={props.reply} />
        </div>
      </div>
    </>
  );
}
