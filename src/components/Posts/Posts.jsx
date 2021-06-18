import { useState, useEffect } from 'react';
import './Posts.css'
import PageTitle from "../../components/PageTitle/PageTitle"
import { Link } from "react-router-dom"
import postsApi from "../../utils/posts-api";

const Posts = (props) => {
  // TODO API Calls and posts state are temporarily here, but should be moved up to a Page
  const [posts, setPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);


  // Load posts here with an API call on component mount.
  // Using a promise since useEffect must be synchronous.
  useEffect(() => {
    const fetchedPosts = postsApi.getAllPosts()
      .then(data => setPosts(data))
      .catch(err => setErrorMsg(err.message))
  }, []);

  return (
    <>
      <PageTitle titleOne={"VIEW"} titleTwo={"POSTS"} />

      {/* TODO style this or make a new Error component, simply shows any errors */}
      {errorMsg ? (<p className="post-error-message">{errorMsg}</p>) : null}

      {/* Showing all posts */}
      <div>
        {posts.length ? posts.slice(0).reverse().map(post => {
          return (
            <div key={post._id}>
              <div className="row">
                <div className="row">
                  {post.itemsOffered[0].isSold ? <div className="post-confirmed">ITEM TRADED</div> : null}
                </div>
                <div className="column-img">
                  <div className={post.itemsOffered[0].isSold ? "Posts-done" : null}>
                    <img id="post-img" src={`${post.itemsOffered[0].image}`} alt="placeholder"></img>
                  </div>
                </div>
                <div className="column-text">
                  <div className={post.itemsOffered[0].isSold ? "Posts-done" : null}>
                    <div className="post-title">Posted By: {post.author.name}</div>
                  </div>
                  <div className={post.itemsOffered[0].isSold ? "Posts-done" : null}>
                    <div className="post-title-pink">{post.title}</div>
                  </div>
                  <div className={post.itemsOffered[0].isSold ? "Posts-done" : null}>
                    <p className='flex-p'>{post.text}</p>
                  </div>
                  <div className={post.itemsOffered[0].isSold ? "Posts-done" : null}>
                    <p className='flex-p-two'>{`Offering: ${post.itemsOffered.length} Items`}</p>
                  </div>
                  <div className={post.itemsOffered[0].isSold ? "Posts-done" : null}>
                    <p className='flex-p-two'>{`Replies: ${post.replies.length}`}</p>
                  </div>
                </div>
                <div className="column-btn">
                  <Link id="link" to={`/posts/${post._id}`}>
                    <div className="post-btn">View More</div>
                  </Link>
                </div>
              </div>
              <hr />
            </div>
          )
        }) : null}
      </div>
    </>
  )
}

export default Posts
