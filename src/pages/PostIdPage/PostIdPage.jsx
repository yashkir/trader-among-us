import React, { useState, useEffect } from 'react'
import PostsApi from "../../utils/posts-api"
import PageTitle from "../../components/PageTitle/PageTitle"
import Reply from "../../components/Reply/Reply"
import "./PostIdPage.css"
import Bid from "../../components/Bid/Bid"

export default function PostIdPage({ match }) {
  // TODO API Calls and posts state are temporarily here, but should be moved up to a Page
  const [post, setPost] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'EST'
  });

  // Load posts here with an API call on component mount.
  // Using a promise since useEffect must be synchronous.
  useEffect(() => {
    PostsApi.getOnePost(match.params.id)
      .then(data => setPost({ ...data, title: data.title.toUpperCase(), date: formatter.format(Date.parse(data.createdAt)) }))
      .catch(err => setErrorMsg(err.message))
  }, []);

  return (
    <>
      <div>
        <PageTitle titleOne={"VIEW"} titleTwo={"POST"} />
      </div>
      <div class='PostIdPage post-page-column'>
        <div class="PostIdPage post-page-row">
          <div className="post-title">{post.title}</div>
        </div>
        <div class="PostIdPage post-page-row">
          <p id="form-p-pink">Posted On: {post.date}</p>
        </div>
        <div class="PostIdPage post-page-row">
          <img id="post-img" alt="#" src="https://i.stack.imgur.com/BOSno.jpg"></img>
        </div>
        <div class="PostIdPage post-page-row">
          <p className="flex-p">{post.text}</p>
        </div>
        <div class="PostIdPage post-page-row">
          <Bid postId={match.params.id} />
        </div>
      </div>
      <div class='PostIdPage post-page-column'>
        <div className="Post-post-title">{post.title} CURRENTLY HAS (.LENGTH) BIDS</div>
        <Reply />
        <Reply />
        <Reply />
        <Reply />
      </div>
    </>
  )
}
