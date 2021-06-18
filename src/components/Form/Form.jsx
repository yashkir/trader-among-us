import { useState } from 'react';
import "./Form.css"
import PageTitle from "../../components/PageTitle/PageTitle"
import postsApi from "../../utils/posts-api";
import { useHistory } from 'react-router';
import ItemDrag from '../ItemDrag/ItemDrag';

const Form = ({ name, description, image, user }) => {
const history = useHistory()
const [inputValues, setInputValues] = useState({
  title: "",
  text: "",
});

const [itemsOffered, setItemsOffered] = useState(null);

const [status, setStatus] = useState(null);

const handleChange = (e) => {
  e.preventDefault();
  setInputValues({ ...inputValues, [e.target.name]: e.target.value });
};

/* FIXME we are not doing any client-side verification here, just calling the API*/
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if(!itemsOffered.length) throw new Error("Please add items");
    const response = await postsApi.create({
      title: inputValues.title,
      text: inputValues.text,
      itemsOffered
    });
    setStatus(response);
    history.push('/posts')
  } catch (err) {
    setStatus(err.message);
  }
}

return (
  <div className="Form form-container">

    <PageTitle titleOne={"NEW"} titleTwo={"POST"} />

    {/* TODO style this error message */}
    {status ? <p className="new-post-error-message">{status}</p> : null}

    <section id="form-sec">
      <form onSubmit={handleSubmit}>
        <div className="form-border">
          <label htmlFor="title" className="form-label">Title</label>
          <input id="title"
            name="title"
            type="text"
            className="form-input"
            value={inputValues.title}
            onChange={handleChange}
          />
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="text"
            rows="6"
            name="text"
            value={inputValues.text}
            onChange={handleChange}
          />
          <ItemDrag setItemsOffered={setItemsOffered} user={user} />
        </div>
      </form>
    </section>

    <div className="btn-div">
      <input className="submit-btn" type="submit" value="SUBMIT" onClick={handleSubmit}></input>
    </div>
  </div>
)
}

export default Form;
