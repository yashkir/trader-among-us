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
    console.log(fetchedPosts);
  }, []);

  return (
    <>
      <PageTitle titleOne={"VIEW"} titleTwo={"POSTS"} />

      {/* TODO style this or make a new Error component, simply shows any errors */}
      {errorMsg ? (<p>{errorMsg}</p>) : null}

      {/* Showing all posts */}
      <div>
        {posts.length ? posts.map(post => {
          console.log(post)
          return (
            <div key={post._id}>
              <div className="row">
                <div className="column-img">
                  {/* TODO this is a placeholder image, remove */}
                  <div><img id="post-img" src="https://i.stack.imgur.com/BOSno.jpg" alt="placeholder"></img></div>
                </div>
                <div className="column-text">
                  <div className="post-title">{post.title}</div>
                  <p className='flex-p'>{post.text}</p>
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

      {/* TODO these are sample posts, remove them */}
      {/*POST ONE */}
      <div className="row">
        <div className="column-img">
          <div><img id="post-img" src="https://i.stack.imgur.com/BOSno.jpg"></img></div>
        </div>
        <div className="column-text">
          <div className="post-title">OLD BIKE FROM MY GRANDMA</div>
          <p className='flex-p'>My grandmas bike is the best guys. THE BEST EVER!!</p>
        </div>
        <div className="column-btn">
          <Link id="link" to='/posts/someid'>
            <div className="post-btn">View More</div>
          </Link>
        </div>
      </div>
      <hr />

      {/*POST TWO */}
      <div className="row">
        <div className="column-img">
          <div><img id="post-img" src="https://www.thoughtco.com/thmb/mX1pV5ctkM7Sr3wYYXjMTyTL1ug=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/pewter-goblet-534177128-5b0218bb04d1cf00365bcd03.jpg"></img></div>
        </div>
        <div className="column-text">
          <div className="post-title">ELIXIR OF IMMORTALITY</div>
          <p className='flex-p'>Trust me guys...</p>
        </div>
        <div className="column-btn">
          <div className="post-btn">View More</div>
        </div>
      </div>
      <hr />
    </>
  )
}

export default Posts
