import { FaHandshake } from "react-icons/fa";
import './Posts.css'
const Posts = ({ title, description, image }) => {
  return (
    <>
      <div className="form-title">
        <h1>VIEW<FaHandshake id="shake-pink" /> POSTS</h1>
        <p id="form-p">Please be respectful of Trade eR's strict<br />
        no currency policy... <span id="form-span">HAPPY TRADING!</span></p>
      </div>

      <div className="row">
        <div className="column-img">
          <div><img id="post-img" src="https://i.stack.imgur.com/BOSno.jpg"></img></div>
        </div>
        <div className="column-text">
          <div className="post-title">{title}</div>
          <p className='flex-p'>My grandmas bike is the best guys. THE BEST EVER!!</p>
        </div>
        <div className="column-btn">
          <div className="post-btn">View More</div>
        </div>
      </div>
      <hr />
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