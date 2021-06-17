import React, { useState, useEffect } from "react";
import PostsApi from "../../utils/posts-api";
import PageTitle from "../../components/PageTitle/PageTitle";
import Reply from "../../components/Reply/Reply";
import "./PostIdPage.css";
import Bid from "../../components/Bid/Bid";
import Carousel from "../../components/Carousel/Carousel";
import { getUser } from "../../utils/users-service";
import DeleteButton from "../../components/DeleteButton/DeleteButton";
import {useHistory} from "react-router-dom"

export default function PostIdPage({ match, user }) {
  const currentUser = getUser();
  const history = useHistory();

  // TODO API Calls and posts state are temporarily here, but should be moved up to a Page
  const [post, setPost] = useState({
    title: "",
    text: "",
    itemsOffered: [],
    date: undefined,
    author: "",
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const handleDelete = (id) => {
    PostsApi.deletePost(id);
    history.push("/posts");
  };

  const formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "EST",
  });

  // Load posts here with an API call on component mount.
  // Using a promise since useEffect must be synchronous.
  function loadPosts() {
    PostsApi.getOnePost(match.params.id)
      .then((data) =>
        setPost({
          ...data,
          title: data.title.toUpperCase(),
          date: formatter.format(Date.parse(data.createdAt)),
        })
      )
      .catch((err) => setErrorMsg(err.message));
  }
  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <div>
        <PageTitle titleOne={"VIEW"} titleTwo={post.title} />
      </div>
      <div class="PostIdPage post-page-column">
        <div class="PostIdPage post-page-row"></div>
        <div class="PostIdPage post-page-row">
          <div className="post-title">Posted By: {post.author.name}</div>
        </div>
        <div class="PostIdPage post-page-row">
          <p id="form-p-pink">{post.date}</p>
        </div>
        <div class="PostIdPage post-page-row">
          <div className="post-offering">{post.author.name} is offering:</div>
        </div>
        <div class="PostIdPage post-page-row">
          <Carousel post={post} />
        </div>
        <div class="PostIdPage post-page-row">
          <p className="flex-p">{post.text}</p>
        </div>
        <div class="PostIdPage post-page-row">
          {currentUser._id !== post.author._id ? (
            <Bid user={user} loadPosts={loadPosts} postId={match.params.id} />
          ) : (
            <DeleteButton handleDelete = {() => handleDelete(post._id)}/>
          )}
        </div>
      </div>
      <div class="PostIdPage post-page-column">
        <div className="Post-post-title">
          {post.title}
          <br /> currently has {post.replies ? post.replies.length : 0} bid(s)
        </div>
        {post.replies
          ? post.replies.map((reply) => {
              return <Reply post={post} reply={reply} />;
            })
          : null}
      </div>
    </>
  );
}
